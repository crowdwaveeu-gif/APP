import 'package:flutter/material.dart';
import '../services/moderation_service.dart';
import '../widgets/user_moderation_widgets.dart';

/// Example integration helper for adding Report/Block actions to chat messages
/// Add this to your individual_chat_screen.dart or chat message widgets

class ChatMessageModerationHelper {
  static void showModerationActions({
    required BuildContext context,
    required String messageId,
    required String senderId,
    required String senderName,
    required String messageText,
    VoidCallback? onReported,
    VoidCallback? onBlocked,
  }) {
    showModalBottomSheet(
      context: context,
      builder: (context) => ModerationActionSheet(
        userId: senderId,
        userName: senderName,
        contentId: messageId,
        contentType: 'message',
        contentPreview: messageText,
        onReported: onReported,
        onBlocked: onBlocked,
      ),
    );
  }

  /// Add this menu item to your message long-press menu or three-dot menu
  static PopupMenuItem<String> getReportMenuItem() {
    return const PopupMenuItem<String>(
      value: 'report',
      child: Row(
        children: [
          Icon(Icons.flag, color: Colors.orange, size: 20),
          SizedBox(width: 12),
          Text('Report'),
        ],
      ),
    );
  }

  static PopupMenuItem<String> getBlockMenuItem() {
    return const PopupMenuItem<String>(
      value: 'block',
      child: Row(
        children: [
          Icon(Icons.block, color: Colors.red, size: 20),
          SizedBox(width: 12),
          Text('Block User'),
        ],
      ),
    );
  }

  /// Handle menu selection
  static void handleMenuSelection({
    required BuildContext context,
    required String selection,
    required String messageId,
    required String senderId,
    required String senderName,
    required String messageText,
    VoidCallback? onReported,
    VoidCallback? onBlocked,
  }) {
    switch (selection) {
      case 'report':
        showDialog(
          context: context,
          builder: (context) => ReportUserContentDialog(
            reportedUserId: senderId,
            contentId: messageId,
            contentType: 'message',
            contentPreview: messageText,
          ),
        ).then((reported) {
          if (reported == true && onReported != null) {
            onReported();
          }
        });
        break;
      case 'block':
        showDialog(
          context: context,
          builder: (context) => BlockUserDialog(
            userId: senderId,
            userName: senderName,
          ),
        ).then((blocked) {
          if (blocked == true && onBlocked != null) {
            onBlocked();
          }
        });
        break;
    }
  }
}

/// Example Widget: Chat Message with Report/Block Menu
class ChatMessageWithModeration extends StatelessWidget {
  final String messageId;
  final String senderId;
  final String senderName;
  final String messageText;
  final bool isCurrentUser;

  const ChatMessageWithModeration({
    Key? key,
    required this.messageId,
    required this.senderId,
    required this.senderName,
    required this.messageText,
    required this.isCurrentUser,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onLongPress: isCurrentUser
          ? null
          : () {
              ChatMessageModerationHelper.showModerationActions(
                context: context,
                messageId: messageId,
                senderId: senderId,
                senderName: senderName,
                messageText: messageText,
                onReported: () {
                  // Optional: refresh UI or show indicator
                },
                onBlocked: () {
                  // Optional: remove messages from blocked user
                  Navigator.pop(context);
                },
              );
            },
      child: Row(
        mainAxisAlignment:
            isCurrentUser ? MainAxisAlignment.end : MainAxisAlignment.start,
        children: [
          if (!isCurrentUser)
            CircleAvatar(
              child: Text(senderName[0].toUpperCase()),
            ),
          const SizedBox(width: 8),
          Flexible(
            child: Container(
              padding: const EdgeInsets.all(12),
              decoration: BoxDecoration(
                color: isCurrentUser ? Colors.blue : Colors.grey[200],
                borderRadius: BorderRadius.circular(12),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  if (!isCurrentUser)
                    Text(
                      senderName,
                      style: const TextStyle(
                        fontWeight: FontWeight.bold,
                        fontSize: 12,
                      ),
                    ),
                  const SizedBox(height: 4),
                  Text(
                    messageText,
                    style: TextStyle(
                      color: isCurrentUser ? Colors.white : Colors.black,
                    ),
                  ),
                ],
              ),
            ),
          ),
          if (!isCurrentUser)
            PopupMenuButton<String>(
              icon: const Icon(Icons.more_vert, size: 18),
              onSelected: (value) {
                ChatMessageModerationHelper.handleMenuSelection(
                  context: context,
                  selection: value,
                  messageId: messageId,
                  senderId: senderId,
                  senderName: senderName,
                  messageText: messageText,
                );
              },
              itemBuilder: (context) => [
                ChatMessageModerationHelper.getReportMenuItem(),
                ChatMessageModerationHelper.getBlockMenuItem(),
              ],
            ),
        ],
      ),
    );
  }
}

/// Example: User Profile Screen with Block Action
class UserProfileActions extends StatelessWidget {
  final String userId;
  final String userName;

  const UserProfileActions({
    Key? key,
    required this.userId,
    required this.userName,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return PopupMenuButton<String>(
      icon: const Icon(Icons.more_vert),
      onSelected: (value) {
        if (value == 'block') {
          showDialog(
            context: context,
            builder: (context) => BlockUserDialog(
              userId: userId,
              userName: userName,
            ),
          ).then((blocked) {
            if (blocked == true) {
              Navigator.pop(context); // Go back after blocking
            }
          });
        }
      },
      itemBuilder: (context) => [
        const PopupMenuItem<String>(
          value: 'block',
          child: Row(
            children: [
              Icon(Icons.block, color: Colors.red, size: 20),
              SizedBox(width: 12),
              Text('Block User'),
            ],
          ),
        ),
      ],
    );
  }
}

/// StreamBuilder example: Filter blocked users from chat list
class ChatListWithBlockFilter extends StatelessWidget {
  const ChatListWithBlockFilter({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final moderationService = ModerationService();

    return StreamBuilder<List<String>>(
      stream: moderationService.blockedUsersStream(),
      builder: (context, snapshot) {
        final blockedUserIds = snapshot.data ?? [];

        // Use this list to filter conversations or messages
        // Example: conversations.where((c) => !blockedUserIds.contains(c.otherUserId))

        return ListView.builder(
          itemCount: 10, // Replace with actual conversation count
          itemBuilder: (context, index) {
            // Filter out blocked users here
            return ListTile(
              title: Text('Conversation $index'),
            );
          },
        );
      },
    );
  }
}
