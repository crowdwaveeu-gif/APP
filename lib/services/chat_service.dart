import 'dart:async';
import 'dart:convert';
import 'dart:io';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:cloud_functions/cloud_functions.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:firebase_messaging/firebase_messaging.dart';
import 'package:flutter/foundation.dart';
import 'package:uuid/uuid.dart';
import '../core/models/chat_message.dart';
import '../core/models/chat_conversation.dart';
import 'presence_service.dart';

class ChatService {
  static final ChatService _instance = ChatService._internal();
  factory ChatService() {
    if (kDebugMode) {
      print(
          '🏭 ChatService factory called - returning singleton instance: ${_instance.hashCode}');
    }
    return _instance;
  }
  ChatService._internal() {
    if (kDebugMode) {
      print(
          '🏗️ ChatService._internal() constructor called - creating instance: ${hashCode}');
    }
  }

  final FirebaseFirestore _firestore = FirebaseFirestore.instance;
  final FirebaseAuth _auth = FirebaseAuth.instance;
  final FirebaseMessaging _messaging = FirebaseMessaging.instance;
  final _uuid = const Uuid();
  final PresenceService _presenceService = PresenceService();

  // Collections
  static const String _conversationsCollection = 'conversations';
  static const String _messagesCollection = 'messages';
  static const String _usersCollection = 'users';

  // Stream controllers for real-time updates
  final Map<String, StreamController<List<ChatMessage>>>
      _messageStreamControllers = {};
  // Keep Firestore subscriptions per conversation so we can cancel them on logout
  final Map<String, StreamSubscription<QuerySnapshot>> _messageSubscriptions =
      {};
  StreamController<List<ChatConversation>> _conversationsStreamController =
      StreamController<List<ChatConversation>>.broadcast();

  // Subscription for conversations listener
  StreamSubscription<QuerySnapshot>? _conversationsSubscription;
  // Listen to auth state to cleanup listeners on sign-out
  StreamSubscription<User?>? _authStateSubscription;

  // ✅ FIX: Add timeout timer at class level
  Timer? _conversationsTimeoutTimer;

  // ✅ CRITICAL FIX: Prevent duplicate conversation listeners
  bool _conversationListenerStarted = false;

  // ✅ NEW: Cache conversations for immediate emission
  List<ChatConversation> _cachedConversations = [];
  bool _isStreamInitialized = false;

  // Current user info
  String? get _currentUserId => _auth.currentUser?.uid;
  String? get currentUserId => _currentUserId;
  User? get currentUser => _auth.currentUser;

  // Initialize chat service
  Future<void> initialize() async {
    if (kDebugMode) {
      print('🚀 ChatService initialization starting...');
      print('👤 Current user ID: $_currentUserId');
    }

    if (_currentUserId == null) {
      throw Exception('User not authenticated. Please log in again.');
    }

    try {
      // ✅ Setup presence service callback for message delivery updates
      _presenceService.setOnUserOnlineCallback((userId) async {
        await markMessagesAsDelivered(userId);
      });

      // Ensure user profile exists in Firestore
      if (kDebugMode) {
        print('👤 Ensuring user profile exists...');
      }
      await _ensureUserProfileExists();

      // Request notification permissions
      if (kDebugMode) {
        print('🔔 Requesting notification permissions...');
      }
      await _requestNotificationPermissions();

      // Update FCM token
      if (kDebugMode) {
        print('📱 Updating FCM token...');
      }
      await _updateFCMToken();

      // Clean up any existing self-conversations
      if (kDebugMode) {
        print('🧹 Cleaning up self-conversations...');
      }
      await _cleanupSelfConversations();

      // Start listening to conversations
      if (kDebugMode) {
        print('👂 Starting conversations listener...');
      }
      _startConversationsListener();

      // ✅ Ensure we clean up message listeners when user signs out
      _authStateSubscription ??= _auth.authStateChanges().listen((user) {
        if (kDebugMode) {
          print('🔔 Auth state changed - current user: ${user?.uid}');
        }
        if (user == null) {
          // User signed out - cancel per-conversation listeners to avoid
          // permission-denied errors from stale listeners.
          _handleSignOutCleanup();
        }
      });

      // ✅ FIX: Update existing conversations with correct user profile data
      await _updateExistingConversationsWithUserData();

      // ✅ REMOVED: Don't emit empty state as it overwrites real data!
      // The conversations listener will emit the actual data

      if (kDebugMode) {
        print('✅ ChatService initialization completed successfully!');
      }
    } catch (e) {
      if (kDebugMode) {
        print('❌ Chat service initialization error: $e');
        print('💡 Error type: ${e.runtimeType}');
        print('💡 Error details: ${e.toString()}');
      }
      rethrow;
    }
  }

  // Clean up any existing self-conversations
  Future<void> _cleanupSelfConversations() async {
    if (_currentUserId == null) return;

    try {
      if (kDebugMode) {
        print('🧹 Checking for self-conversations to clean up...');
      }

      final query = await _firestore
          .collection(_conversationsCollection)
          .where('participantIds', arrayContains: _currentUserId)
          .get();

      for (final doc in query.docs) {
        final conversation = ChatConversation.fromMap(doc.data());

        // Check if this is a self-conversation (same user in both participant slots)
        if (conversation.participantIds.length == 2 &&
            conversation.participantIds[0] == conversation.participantIds[1]) {
          if (kDebugMode) {
            print('🗑️ Found self-conversation to delete: ${doc.id}');
          }

          // Delete the self-conversation
          await doc.reference.delete();

          // Also delete all messages in this conversation
          final messagesQuery =
              await doc.reference.collection(_messagesCollection).get();

          for (final messageDoc in messagesQuery.docs) {
            await messageDoc.reference.delete();
          }
        }
      }

      if (kDebugMode) {
        print('✅ Self-conversation cleanup completed');
      }
    } catch (e) {
      if (kDebugMode) {
        print('❌ Error during self-conversation cleanup: $e');
      }
    }
  }

  // Ensure user profile exists in Firestore
  Future<void> _ensureUserProfileExists() async {
    if (_currentUserId == null) return;

    final userDoc = await _firestore
        .collection(_usersCollection)
        .doc(_currentUserId!)
        .get();

    if (!userDoc.exists) {
      // Create basic user profile if it doesn't exist
      final user = _auth.currentUser;
      await _firestore.collection(_usersCollection).doc(_currentUserId!).set({
        'fullName': user?.displayName ?? 'User', // Use consistent field name
        'name': user?.displayName ?? 'User', // Keep for backwards compatibility
        'email': user?.email ?? '',
        'photoUrl': user?.photoURL, // Use consistent field name
        'avatar': user?.photoURL, // Keep for backwards compatibility
        'isOnline': true,
        'lastSeen': FieldValue.serverTimestamp(),
        'createdAt': FieldValue.serverTimestamp(),
      });

      if (kDebugMode) {
        print('✅ Created basic user profile for $_currentUserId');
        print('  - Name: ${user?.displayName ?? 'User'}');
        print('  - Avatar: ${user?.photoURL != null ? "Present" : "None"}');
      }
    } else {
      // Update fields to ensure consistency between old and new field names
      final data = userDoc.data()!;
      final Map<String, dynamic> updates = {};

      // Sync name fields
      if (data['fullName'] != null && data['name'] == null) {
        updates['name'] = data['fullName'];
      } else if (data['name'] != null && data['fullName'] == null) {
        updates['fullName'] = data['name'];
      }

      // Sync avatar fields
      if (data['photoUrl'] != null && data['avatar'] == null) {
        updates['avatar'] = data['photoUrl'];
      } else if (data['avatar'] != null && data['photoUrl'] == null) {
        updates['photoUrl'] = data['avatar'];
      }

      // Apply updates if needed
      if (updates.isNotEmpty) {
        await _firestore
            .collection(_usersCollection)
            .doc(_currentUserId!)
            .update(updates);

        if (kDebugMode) {
          print('🔄 Synced profile field names for $_currentUserId');
          print('  - Updates: $updates');
        }
      }
    }
  }

  // ✅ FIX: Update existing conversations with correct user profile data
  Future<void> _updateExistingConversationsWithUserData() async {
    if (_currentUserId == null) return;

    try {
      if (kDebugMode) {
        print('🔄 Updating existing conversations with correct user data...');
      }

      // Get current user's profile data
      final userDoc = await _firestore
          .collection(_usersCollection)
          .doc(_currentUserId!)
          .get();

      if (!userDoc.exists) return;

      final userData = userDoc.data()!;
      final currentUserName = userData['fullName'] ??
          userData['name'] ??
          _auth.currentUser?.displayName ??
          'User';
      final currentUserAvatar = userData['photoUrl'] ??
          userData['avatar'] ??
          _auth.currentUser?.photoURL;

      // Get all conversations involving current user
      final conversationsSnapshot = await _firestore
          .collection(_conversationsCollection)
          .where('participantIds', arrayContains: _currentUserId)
          .get();

      final batch = _firestore.batch();
      int updateCount = 0;

      for (final doc in conversationsSnapshot.docs) {
        final data = doc.data();
        final participantNames =
            Map<String, String>.from(data['participantNames'] ?? {});
        final participantAvatars =
            Map<String, String?>.from(data['participantAvatars'] ?? {});

        bool needsUpdate = false;

        // Update participant name if it's wrong
        if (participantNames[_currentUserId!] != currentUserName) {
          participantNames[_currentUserId!] = currentUserName;
          needsUpdate = true;
        }

        // Update participant avatar if it's wrong
        if (participantAvatars[_currentUserId!] != currentUserAvatar) {
          participantAvatars[_currentUserId!] = currentUserAvatar;
          needsUpdate = true;
        }

        if (needsUpdate) {
          batch.update(doc.reference, {
            'participantNames': participantNames,
            'participantAvatars': participantAvatars,
          });
          updateCount++;
        }
      }

      if (updateCount > 0) {
        await batch.commit();
        if (kDebugMode) {
          print('✅ Updated $updateCount conversations with correct user data');
          print('  - Name: $currentUserName');
          print(
              '  - Avatar: ${currentUserAvatar != null ? "Present" : "None"}');
        }
      } else {
        if (kDebugMode) {
          print('✅ All conversations already have correct user data');
        }
      }
    } catch (e) {
      if (kDebugMode) {
        print('❌ Error updating existing conversations: $e');
      }
    }
  }

  // ✅ PUBLIC METHOD: Manually refresh user data in all conversations
  Future<void> refreshUserDataInConversations() async {
    await _updateExistingConversationsWithUserData();
  }

  // Request notification permissions
  Future<void> _requestNotificationPermissions() async {
    NotificationSettings settings = await _messaging.requestPermission(
      alert: true,
      announcement: false,
      badge: true,
      carPlay: false,
      criticalAlert: false,
      provisional: false,
      sound: true,
    );

    if (kDebugMode) {
      print('User granted permission: ${settings.authorizationStatus}');
    }
  }

  // Update FCM token for push notifications
  Future<void> _updateFCMToken() async {
    try {
      final token = await _messaging.getToken();
      if (token != null && _currentUserId != null) {
        await _firestore.collection(_usersCollection).doc(_currentUserId).set({
          'fcmToken': token,
          'lastSeen': FieldValue.serverTimestamp(),
          'isOnline': true,
        }, SetOptions(merge: true));
      }
    } catch (e) {
      if (kDebugMode) {
        print('Error updating FCM token: $e');
      }
    }
  }

  // Create or get conversation between two users - ONE conversation per user pair
  Future<String> createOrGetConversation({
    required String otherUserId,
    required String otherUserName,
    String? otherUserAvatar,
    String? packageRequestId, // This will be ignored for unified conversations
  }) async {
    if (_currentUserId == null) {
      throw Exception('User not authenticated. Please log in again.');
    }

    if (otherUserId.isEmpty) {
      throw Exception('Invalid recipient. Please try again.');
    }

    // Prevent users from creating conversations with themselves
    if (otherUserId == _currentUserId) {
      throw Exception('Cannot create conversation with yourself.');
    }

    try {
      // ✅ UNIFIED CONVERSATION: Generate ONE conversation ID per user pair (ignore packageRequestId)
      final userIds = [_currentUserId!, otherUserId]..sort();
      final conversationId = '${userIds[0]}_${userIds[1]}';

      if (kDebugMode) {
        print('🔍 Looking for unified conversation: $conversationId');
        print('  - Between users: $_currentUserId ↔ $otherUserId');
      }

      // Check if conversation already exists
      final conversationDoc = await _firestore
          .collection(_conversationsCollection)
          .doc(conversationId)
          .get();

      if (conversationDoc.exists) {
        if (kDebugMode) {
          print('✅ Found existing unified conversation: $conversationId');
        }

        // ✅ UPDATE: Always update participant info in case names/avatars changed
        await _updateConversationParticipantInfo(
            conversationId, otherUserId, otherUserName, otherUserAvatar);

        return conversationId;
      }

      if (kDebugMode) {
        print(
            '🆕 Creating new unified conversation: $conversationId between $_currentUserId and $otherUserId');
      }

      // Get current user info
      final currentUserDoc = await _firestore
          .collection(_usersCollection)
          .doc(_currentUserId!)
          .get();

      if (!currentUserDoc.exists) {
        throw Exception(
            'User profile not found. Please update your profile and try again.');
      }

      final currentUserData = currentUserDoc.data();
      // ✅ FIX: Use consistent field names - try both old and new field names for compatibility
      String currentUserName = 'User';
      String? currentUserAvatar;

      if (currentUserData != null) {
        // Try new field names first (from UserProfileService)
        currentUserName = currentUserData['fullName'] ??
            currentUserData['name'] ??
            _auth.currentUser?.displayName ??
            'User';

        currentUserAvatar = currentUserData['photoUrl'] ??
            currentUserData['avatar'] ??
            _auth.currentUser?.photoURL;
      }

      if (kDebugMode) {
        print('📋 Current user profile data:');
        print('  - Name: $currentUserName');
        print('  - Avatar: ${currentUserAvatar != null ? "Present" : "None"}');
        print('  - Available fields: ${currentUserData?.keys.toList()}');
      }

      // Create new conversation
      final conversation = ChatConversation(
        id: conversationId,
        participantIds: [_currentUserId!, otherUserId],
        participantNames: {
          _currentUserId!: currentUserName,
          otherUserId: otherUserName,
        },
        participantAvatars: {
          _currentUserId!: currentUserAvatar,
          otherUserId: otherUserAvatar,
        },
        unreadCounts: {
          _currentUserId!: 0,
          otherUserId: 0,
        },
        lastActivity: DateTime.now(),
        packageRequestId: null, // ✅ UNIFIED: Remove package-specific linking
      );

      await _firestore
          .collection(_conversationsCollection)
          .doc(conversationId)
          .set(conversation.toMap());

      if (kDebugMode) {
        print('✅ Successfully created unified conversation: $conversationId');
      }

      return conversationId;
    } catch (e) {
      if (kDebugMode) {
        print('❌ Create conversation error: $e');
      }
      rethrow;
    }
  }

  // ✅ NEW: Update participant info in existing conversation
  Future<void> _updateConversationParticipantInfo(String conversationId,
      String otherUserId, String otherUserName, String? otherUserAvatar) async {
    try {
      // Get current user info
      final currentUserDoc = await _firestore
          .collection(_usersCollection)
          .doc(_currentUserId!)
          .get();

      String currentUserName = 'User';
      String? currentUserAvatar;

      if (currentUserDoc.exists) {
        final currentUserData = currentUserDoc.data();
        currentUserName = currentUserData?['fullName'] ??
            currentUserData?['name'] ??
            _auth.currentUser?.displayName ??
            'User';
        currentUserAvatar = currentUserData?['photoUrl'] ??
            currentUserData?['avatar'] ??
            _auth.currentUser?.photoURL;
      }

      // Update conversation with latest participant info
      await _firestore
          .collection(_conversationsCollection)
          .doc(conversationId)
          .update({
        'participantNames': {
          _currentUserId!: currentUserName,
          otherUserId: otherUserName,
        },
        'participantAvatars': {
          _currentUserId!: currentUserAvatar,
          otherUserId: otherUserAvatar,
        },
      });

      if (kDebugMode) {
        print('✅ Updated participant info for conversation: $conversationId');
      }
    } catch (e) {
      if (kDebugMode) {
        print('⚠️ Failed to update participant info: $e');
      }
      // Don't throw - this is not critical
    }
  }

  // Send a message
  Future<ChatMessage> sendMessage({
    required String conversationId,
    required String content,
    required MessageType type,
    Map<String, dynamic>? metadata,
    String? replyToMessageId,
  }) async {
    if (_currentUserId == null) {
      throw Exception('User not authenticated. Please log in again.');
    }

    try {
      final message = ChatMessage(
        id: _uuid.v4(),
        senderId: _currentUserId!,
        receiverId: '', // Will be set based on conversation participants
        content: content,
        type: type,
        timestamp: DateTime.now(),
        status: MessageStatus.sending,
        metadata: metadata,
        replyToMessageId: replyToMessageId,
      );

      // Get conversation to find receiver
      final conversationDoc = await _firestore
          .collection(_conversationsCollection)
          .doc(conversationId)
          .get();

      if (!conversationDoc.exists) {
        throw Exception(
            'Conversation not found. Please refresh and try again.');
      }

      final conversationData = conversationDoc.data();
      if (conversationData == null) {
        throw Exception('Invalid conversation data. Please try again.');
      }

      final conversation = ChatConversation.fromMap(conversationData);
      final receiverId = conversation.getOtherParticipantId(_currentUserId!);

      if (receiverId == null || receiverId.isEmpty) {
        throw Exception(
            'Unable to find conversation recipient. Please try again.');
      }

      final messageWithReceiver = message.copyWith(
        receiverId: receiverId,
        status: MessageStatus.sent,
      );

      // Add message to Firestore
      await _firestore
          .collection(_conversationsCollection)
          .doc(conversationId)
          .collection(_messagesCollection)
          .doc(message.id)
          .set(messageWithReceiver.toMap());

      if (kDebugMode) {
        print(
            'Message sent successfully: ${message.id} in conversation: $conversationId');
      }

      // Update conversation with last message and increment unread count
      await _firestore
          .collection(_conversationsCollection)
          .doc(conversationId)
          .update({
        'lastMessage': messageWithReceiver.toMap(),
        'lastActivity': FieldValue.serverTimestamp(),
        'unreadCounts.$receiverId': FieldValue.increment(1),
      });

      if (kDebugMode) {
        print('Conversation updated with last message: $conversationId');
      }

      // Send push notification
      await _sendPushNotification(
        receiverId: receiverId,
        senderName: conversation.participantNames[_currentUserId!] ?? 'Someone',
        message: content,
        conversationId: conversationId,
      );

      return messageWithReceiver;
    } catch (e) {
      if (kDebugMode) {
        print('Send message error: $e');
      }
      rethrow;
    }
  }

  // ✅ REAL PUSH NOTIFICATION SENDING - No more mock!
  Future<void> _sendPushNotification({
    required String receiverId,
    required String senderName,
    required String message,
    required String conversationId,
  }) async {
    try {
      // Get receiver's FCM token
      final receiverDoc =
          await _firestore.collection(_usersCollection).doc(receiverId).get();

      final fcmToken = receiverDoc.data()?['fcmToken'];
      if (fcmToken == null || fcmToken.isEmpty) {
        if (kDebugMode) {
          print('❌ No FCM token found for user: $receiverId');
        }
        return;
      }

      if (kDebugMode) {
        print('🚀 SENDING REAL PUSH NOTIFICATION...');
        print('📧 To: $receiverId');
        print('👤 From: $senderName');
        print('💬 Message: $message');
        print('🆔 Sender ID: $_currentUserId');
        print(
            '🚫 Self-notification check: ${_currentUserId == receiverId ? "BLOCKED" : "ALLOWED"}');
      }

      // ✅ CRITICAL: Prevent self-notifications in chat service too!
      if (_currentUserId == receiverId) {
        if (kDebugMode) {
          print(
              '🚫 BLOCKING self-notification: sender and receiver are the same!');
        }
        return;
      }

      // ✅ SEND ACTUAL FCM PUSH NOTIFICATION
      await _sendFCMNotification(
        token: fcmToken,
        title: senderName,
        body: message,
        data: {
          'type': 'chat_message',
          'conversationId': conversationId,
          'senderId': _currentUserId ?? '',
          'senderName': senderName,
        },
      );

      if (kDebugMode) {
        print('✅ Push notification sent successfully!');
      }
    } catch (e) {
      if (kDebugMode) {
        print('❌ Error sending push notification: $e');
      }
    }
  }

  // ✅ ACTUAL FCM HTTP API CALL - Real notification sending
  Future<void> _sendFCMNotification({
    required String token,
    required String title,
    required String body,
    Map<String, dynamic>? data,
  }) async {
    try {
      if (kDebugMode) {
        print('🚀 SENDING FCM NOTIFICATION VIA CLOUD FUNCTION...');
        print('� Token: ${token.substring(0, 20)}...');
        print('🏷️ Title: $title');
        print('💬 Body: $body');
      }

      // ✅ USE FIREBASE CLOUD FUNCTION INSTEAD OF DEPRECATED API
      final callable =
          FirebaseFunctions.instance.httpsCallable('sendFCMNotification');

      final result = await callable.call({
        'fcmToken': token,
        'title': title,
        'body': body,
        'data': data ?? {},
      });

      if (kDebugMode) {
        print('✅ FCM notification sent via Cloud Function');
        print('📊 Response: ${result.data}');
      }
    } on FirebaseFunctionsException catch (e) {
      if (kDebugMode) {
        print('❌ Cloud Function FCM error: ${e.code} - ${e.message}');
        print('📄 Details: ${e.details}');
      }
      // Don't rethrow - continue even if notification fails
    } catch (e) {
      if (kDebugMode) {
        print('❌ Cloud Function FCM error: $e');
      }
      // Don't rethrow - continue even if notification fails
    }
  }

  // Get messages stream for a conversation
  Stream<List<ChatMessage>> getMessagesStream(String conversationId) {
    if (kDebugMode) {
      print('📨 getMessagesStream() called for conversation: $conversationId');
    }

    // Check if we have an existing controller and subscription
    if (_messageStreamControllers.containsKey(conversationId)) {
      if (!_messageStreamControllers[conversationId]!.isClosed) {
        // ✅ FIX: Check if subscription is still active
        final hasActiveSubscription =
            _messageSubscriptions.containsKey(conversationId);

        if (kDebugMode) {
          print('  ♻️ Existing stream found for: $conversationId');
          print('  📡 Active subscription: $hasActiveSubscription');
        }

        // If subscription is active, return existing stream
        if (hasActiveSubscription) {
          if (kDebugMode) {
            print('  ✅ Returning existing stream with active subscription');
          }
          return _messageStreamControllers[conversationId]!.stream;
        } else {
          // Subscription was cancelled, need to recreate it
          if (kDebugMode) {
            print('  ⚠️ Subscription was cancelled, recreating...');
          }
          // Don't return - fall through to recreate subscription
        }
      } else {
        // Remove closed controller
        if (kDebugMode) {
          print('  🗑️ Removing closed controller for: $conversationId');
        }
        _messageStreamControllers.remove(conversationId);
        _messageSubscriptions.remove(conversationId);
      }
    }

    if (kDebugMode) {
      print('  🆕 Creating new message stream for: $conversationId');
    }

    // Reuse existing controller if it's still open, otherwise create new one
    final controller = _messageStreamControllers[conversationId] ??
        StreamController<List<ChatMessage>>.broadcast();
    _messageStreamControllers[conversationId] = controller;

    // Cancel any existing Firestore subscription for this conversation
    _messageSubscriptions[conversationId]?.cancel();

    if (kDebugMode) {
      print('  🔌 Setting up Firestore listener for: $conversationId');
    }

    final sub = _firestore
        .collection(_conversationsCollection)
        .doc(conversationId)
        .collection(_messagesCollection)
        .orderBy('timestamp', descending: false)
        .snapshots()
        .listen(
      (snapshot) {
        if (kDebugMode) {
          print(
              '📬 FIRESTORE SNAPSHOT for $conversationId: ${snapshot.docs.length} messages (fromCache=${snapshot.metadata.isFromCache})');
        }

        if (!controller.isClosed) {
          try {
            final messages = snapshot.docs
                .map((doc) => ChatMessage.fromMap(doc.data()))
                .toList();

            if (kDebugMode) {
              print('✅ Parsed ${messages.length} messages for $conversationId');
              if (messages.isNotEmpty) {
                print(
                    '  - First message: ${messages.first.content.substring(0, messages.first.content.length > 30 ? 30 : messages.first.content.length)}...');
                print(
                    '  - Last message: ${messages.last.content.substring(0, messages.last.content.length > 30 ? 30 : messages.last.content.length)}...');
              } else {
                print('  ℹ️ No messages to display (empty conversation)');
              }
            }

            controller.add(messages);

            if (kDebugMode) {
              print(
                  '📤 Added ${messages.length} messages to stream controller for $conversationId');
            }
          } catch (e) {
            if (kDebugMode) {
              print('❌ Error parsing messages: $e');
              print('   Stack trace: ${StackTrace.current}');
            }
            controller.addError(e);
          }
        } else if (kDebugMode) {
          print(
              '⚠️ Controller already closed for $conversationId, skipping add');
        }
      },
      onError: (error) {
        if (kDebugMode) {
          print('❌ Firestore stream error for $conversationId: $error');
        }
        if (!controller.isClosed) {
          controller.addError(error);
        }
      },
    );

    // Track the subscription so it can be cancelled on logout
    _messageSubscriptions[conversationId] = sub;

    if (kDebugMode) {
      print(
          '  ✅ Firestore subscription created and tracked for: $conversationId');
      print('  📊 Total active subscriptions: ${_messageSubscriptions.length}');
    }

    return controller.stream;
  }

  // ✅ NEW: Get messages once (non-streaming) for immediate load
  Future<List<ChatMessage>> getMessagesOnce(String conversationId) async {
    if (kDebugMode) {
      print('⚡ getMessagesOnce() called for conversation: $conversationId');
    }

    try {
      final snapshot = await _firestore
          .collection(_conversationsCollection)
          .doc(conversationId)
          .collection(_messagesCollection)
          .orderBy('timestamp', descending: false)
          .get();

      final messages = snapshot.docs
          .map((doc) {
            try {
              return ChatMessage.fromMap(doc.data());
            } catch (e) {
              if (kDebugMode) {
                print('⚠️ Error parsing message ${doc.id}: $e');
              }
              return null;
            }
          })
          .whereType<ChatMessage>()
          .toList();

      if (kDebugMode) {
        print('✅ Fetched ${messages.length} messages for $conversationId');
      }

      return messages;
    } catch (e) {
      if (kDebugMode) {
        print('❌ Error fetching messages: $e');
      }
      return [];
    }
  }

  // Get conversations stream
  Stream<List<ChatConversation>> getConversationsStream() {
    if (kDebugMode) {
      print(
          '📡 getConversationsStream() called on ChatService instance: ${hashCode}');
      print(
          '  - Stream controller closed: ${_conversationsStreamController.isClosed}');
      print(
          '  - Stream controller hash: ${_conversationsStreamController.hashCode}');
      print('  - Cached conversations: ${_cachedConversations.length}');
      print('  - Stream initialized: $_isStreamInitialized');
    }

    // ✅ FIX: If stream controller is closed, recreate it
    if (_conversationsStreamController.isClosed) {
      if (kDebugMode) {
        print('🔄 Stream controller was closed - recreating it');
      }
      _conversationsStreamController =
          StreamController<List<ChatConversation>>.broadcast();
      _isStreamInitialized = false;
      // Restart the listener with the new stream controller
      _startConversationsListener();
    }

    // ✅ NEW: Emit cached data immediately if available
    if (_cachedConversations.isNotEmpty &&
        !_conversationsStreamController.isClosed) {
      if (kDebugMode) {
        print(
            '💨 IMMEDIATE EMIT: Sending ${_cachedConversations.length} cached conversations to stream');
      }
      // Use Future.microtask to emit on next event loop iteration
      Future.microtask(() {
        if (!_conversationsStreamController.isClosed) {
          _conversationsStreamController.add(_cachedConversations);
        }
      });
    }

    // ✅ NEW: Initialize stream listener if not done yet
    if (!_isStreamInitialized) {
      _isStreamInitialized = true;
      if (kDebugMode) {
        print('🎬 Initializing stream listener for the first time');
      }
      _startConversationsListener();
    }

    return _conversationsStreamController.stream;
  }

  // Start listening to conversations
  void _startConversationsListener() {
    if (_currentUserId == null) {
      if (kDebugMode) {
        print('❌ Cannot start conversations listener - no current user');
      }
      return;
    }

    // ✅ CRITICAL FIX: Prevent multiple listeners
    if (_conversationListenerStarted) {
      if (kDebugMode) {
        print(
            '⚠️ Conversation listener already started in ChatService, skipping duplicate');
      }
      return;
    }

    if (kDebugMode) {
      print('👂 Starting conversations listener for user: $_currentUserId');
    }

    _conversationListenerStarted = true;

    // Cancel existing subscription if any
    _conversationsSubscription?.cancel();

    // ✅ FIX: Cancel existing timeout timer
    _conversationsTimeoutTimer?.cancel();

    // ✅ REMOVED PROBLEMATIC TIMEOUT: Don't send empty arrays that override real data
    // The UI handles loading states properly without needing empty array fallbacks

    _conversationsSubscription = _firestore
        .collection(_conversationsCollection)
        .where('participantIds', arrayContains: _currentUserId)
        .orderBy('lastActivity', descending: true)
        .snapshots(
            includeMetadataChanges: false) // Force fresh data from server
        .listen(
      (snapshot) {
        try {
          // ✅ Cancel timeout timer since we got real data
          _conversationsTimeoutTimer?.cancel();

          if (kDebugMode) {
            print('📊 Conversations snapshot received:');
            print('  - Document count: ${snapshot.docs.length}');
            print('  - Metadata: from cache: ${snapshot.metadata.isFromCache}');
          }

          // ✅ NEW: Use helper method to process snapshot
          final conversations = _processConversationsSnapshot(snapshot);

          if (kDebugMode) {
            print(
                '✅ Loaded ${conversations.length} active conversations for user $_currentUserId');
            for (int i = 0; i < conversations.length; i++) {
              final conv = conversations[i];
              print('  - Conversation ${i + 1}: ${conv.id}');
              print('    Participants: ${conv.participantIds}');
              print('    Last activity: ${conv.lastActivity}');
              print('    Is active: ${conv.isActive}');
            }
          }

          // ✅ NEW: Cache the conversations for immediate emission
          _cachedConversations = conversations;

          if (!_conversationsStreamController.isClosed) {
            if (kDebugMode) {
              print(
                  '🟢 STREAM DEBUG: Adding ${conversations.length} conversations from Firestore listener to stream controller');
              print(
                  '🔄 STREAM: Sent ${conversations.length} conversations to stream');
            }
            _conversationsStreamController.add(conversations);
          } else {
            if (kDebugMode) {
              print(
                  '❌ STREAM CONTROLLER CLOSED: Cannot add conversations to closed stream!');
            }
          }
        } catch (e) {
          if (kDebugMode) {
            print('❌ Error processing conversations snapshot: $e');
            print('💡 Error type: ${e.runtimeType}');
          }
          if (!_conversationsStreamController.isClosed) {
            _conversationsStreamController.addError(e);
          }
        }
      },
      onError: (error) {
        if (kDebugMode) {
          print('❌ Conversations stream error: $error');
          print('💡 Error type: ${error.runtimeType}');
          print('💡 Error details: ${error.toString()}');
        }
        if (!_conversationsStreamController.isClosed) {
          _conversationsStreamController.addError(error);
        }
      },
    );
  }

  // ✅ Mark messages as delivered when recipient comes online
  Future<void> markMessagesAsDelivered(String userId) async {
    if (_currentUserId == null) return;

    try {
      // Get all conversations where this user is a participant
      final conversationsQuery = await _firestore
          .collection(_conversationsCollection)
          .where('participantIds', arrayContains: userId)
          .get();

      final batch = _firestore.batch();
      int updateCount = 0;

      for (final conversationDoc in conversationsQuery.docs) {
        // Get undelivered messages sent to this user
        final messagesQuery = await _firestore
            .collection(_conversationsCollection)
            .doc(conversationDoc.id)
            .collection(_messagesCollection)
            .where('receiverId', isEqualTo: userId)
            .where('status', isEqualTo: MessageStatus.sent.name)
            .get();

        for (final messageDoc in messagesQuery.docs) {
          batch.update(messageDoc.reference, {
            'status': MessageStatus.delivered.name,
            'deliveredAt': FieldValue.serverTimestamp(),
          });
          updateCount++;
        }
      }

      if (updateCount > 0) {
        await batch.commit();
        if (kDebugMode) {
          print(
              '✅ Marked $updateCount messages as delivered for user: $userId');
        }
      }
    } catch (e) {
      if (kDebugMode) {
        print('❌ Error marking messages as delivered: $e');
      }
    }
  }

  // ✅ Mark messages as read with enhanced logic
  Future<void> markMessagesAsRead(
      String conversationId, List<String> messageIds) async {
    if (_currentUserId == null) return;

    final batch = _firestore.batch();

    // Update message statuses
    for (final messageId in messageIds) {
      final messageRef = _firestore
          .collection(_conversationsCollection)
          .doc(conversationId)
          .collection(_messagesCollection)
          .doc(messageId);

      batch.update(messageRef, {
        'status': MessageStatus.read.name,
        'readAt': FieldValue.serverTimestamp(),
      });
    }

    // Reset unread count for current user
    final conversationRef =
        _firestore.collection(_conversationsCollection).doc(conversationId);

    batch.update(conversationRef, {
      'unreadCounts.$_currentUserId': 0,
    });

    await batch.commit();

    if (kDebugMode) {
      print(
          '✅ Marked ${messageIds.length} messages as read in $conversationId');
    }
  }

  // ✅ Auto-mark messages as read when user opens conversation
  Future<void> markConversationAsRead(String conversationId) async {
    if (_currentUserId == null) return;

    try {
      // Get all unread messages in this conversation sent to current user
      final unreadMessagesQuery = await _firestore
          .collection(_conversationsCollection)
          .doc(conversationId)
          .collection(_messagesCollection)
          .where('receiverId', isEqualTo: _currentUserId)
          .where('status', whereIn: [
        MessageStatus.sent.name,
        MessageStatus.delivered.name
      ]).get();

      if (unreadMessagesQuery.docs.isNotEmpty) {
        final messageIds =
            unreadMessagesQuery.docs.map((doc) => doc.id).toList();
        await markMessagesAsRead(conversationId, messageIds);
      }
    } catch (e) {
      if (kDebugMode) {
        print('❌ Error auto-marking conversation as read: $e');
      }
    }
  }

  // Delete a message
  Future<void> deleteMessage(String conversationId, String messageId) async {
    await _firestore
        .collection(_conversationsCollection)
        .doc(conversationId)
        .collection(_messagesCollection)
        .doc(messageId)
        .delete();
  }

  // Set user online status
  Future<void> setUserOnlineStatus(bool isOnline) async {
    if (_currentUserId == null) return;

    await _firestore.collection(_usersCollection).doc(_currentUserId).set({
      'isOnline': isOnline,
      'lastSeen': FieldValue.serverTimestamp(),
    }, SetOptions(merge: true));
  }

  // Get user online status
  Stream<bool> getUserOnlineStatus(String userId) {
    return _firestore
        .collection(_usersCollection)
        .doc(userId)
        .snapshots()
        .map((doc) => doc.data()?['isOnline'] ?? false);
  }

  // Upload image and send image message
  Future<ChatMessage> sendImageMessage({
    required String conversationId,
    required File imageFile,
    String? caption,
  }) async {
    try {
      print('🖼️ Converting image to base64...');

      // Convert image to base64
      final bytes = await imageFile.readAsBytes();
      final base64Image = base64Encode(bytes);

      print('✅ Image converted to base64 (${base64Image.length} characters)');

      // Send message with base64 image
      return await sendMessage(
        conversationId: conversationId,
        content: caption ?? '',
        type: MessageType.image,
        metadata: {
          'imageBase64': base64Image,
          'caption': caption,
        },
      );
    } catch (e) {
      print('❌ Error sending image message: $e');
      // Send a failed message for UI feedback
      return await sendMessage(
        conversationId: conversationId,
        content: 'Failed to send image',
        type: MessageType.image,
        metadata: {
          'imageBase64': null,
          'caption': caption,
          'error': 'Upload failed',
        },
      );
    }
  }

  // Search conversations
  Future<List<ChatConversation>> searchConversations(String query) async {
    if (_currentUserId == null) return [];

    final snapshot = await _firestore
        .collection(_conversationsCollection)
        .where('participantIds', arrayContains: _currentUserId)
        .get();

    final conversations = snapshot.docs
        .map((doc) => ChatConversation.fromMap(doc.data()))
        .where((conv) {
      final otherUserName = conv.getOtherParticipantName(_currentUserId!);
      return otherUserName?.toLowerCase().contains(query.toLowerCase()) ??
          false;
    }).toList();

    return conversations;
  }

  // Restart conversations listener
  void restartConversationsListener() {
    // ✅ FIX: Don't recreate stream controller - just restart the listener
    // If the controller is closed, something went wrong - but don't recreate it here
    // as it breaks existing connections
    if (_conversationsStreamController.isClosed) {
      if (kDebugMode) {
        print('⚠️ Stream controller is closed - this should not happen');
      }
      return;
    }
    _startConversationsListener();
  }

  // ✅ NEW: Process conversations snapshot (DRY helper method)
  List<ChatConversation> _processConversationsSnapshot(QuerySnapshot snapshot) {
    if (kDebugMode) {
      print('📊 RAW SNAPSHOT: ${snapshot.docs.length} documents');
    }

    // Use a map to deduplicate conversations by ID
    final Map<String, ChatConversation> conversationMap = {};

    for (var doc in snapshot.docs) {
      if (kDebugMode) {
        print('  - Processing conversation doc: ${doc.id}');
      }

      try {
        final data = doc.data();
        if (data == null) continue;

        final conversation =
            ChatConversation.fromMap(data as Map<String, dynamic>);

        // Skip inactive conversations
        if (!conversation.isActive) continue;

        // Use conversation ID as key to prevent duplicates
        final conversationId = conversation.id;

        // If we already have this conversation, keep the one with more recent activity
        if (conversationMap.containsKey(conversationId)) {
          final existing = conversationMap[conversationId]!;
          if (conversation.lastActivity.isAfter(existing.lastActivity)) {
            conversationMap[conversationId] = conversation;
            if (kDebugMode) {
              print(
                  '  - ✅ Updated duplicate conversation: $conversationId (newer activity)');
            }
          } else {
            if (kDebugMode) {
              print(
                  '  - ⏭️ Skipped duplicate conversation: $conversationId (older activity)');
            }
          }
        } else {
          conversationMap[conversationId] = conversation;
        }
      } catch (e) {
        if (kDebugMode) {
          print('❌ Error parsing conversation doc ${doc.id}: $e');
        }
      }
    }

    final conversations = conversationMap.values.toList();

    // Sort by last activity (most recent first)
    conversations.sort((a, b) => b.lastActivity.compareTo(a.lastActivity));

    if (kDebugMode) {
      print(
          '✅ Processed ${conversations.length} active conversations (deduplicated)');
      for (var conv in conversations) {
        print('  - ${conv.id}: ${conv.participantNames.values.join(', ')}');
      }
    }

    return conversations;
  }

  // ✅ NEW: Force refresh from server to ensure latest conversations
  Future<void> forceRefreshConversations() async {
    if (_currentUserId == null) return;

    try {
      if (kDebugMode) {
        print('🔄 Force refreshing conversations from server...');
      }

      // Get fresh data from server (not cache)
      final snapshot = await _firestore
          .collection(_conversationsCollection)
          .where('participantIds', arrayContains: _currentUserId)
          .orderBy('lastActivity', descending: true)
          .get(const GetOptions(source: Source.server)); // Force server fetch

      // ✅ NEW: Use helper method to process snapshot
      final conversations = _processConversationsSnapshot(snapshot);

      if (kDebugMode) {
        print(
            '✅ Force refreshed ${conversations.length} conversations from server');
      }

      // ✅ NEW: Cache the conversations
      _cachedConversations = conversations;

      // Emit the fresh data
      if (!_conversationsStreamController.isClosed) {
        if (kDebugMode) {
          print(
              '🔵 STREAM DEBUG: Adding ${conversations.length} conversations from force refresh to stream controller');
        }
        _conversationsStreamController.add(conversations);
      } else {
        if (kDebugMode) {
          print(
              '❌ STREAM CONTROLLER CLOSED: Cannot add force refreshed conversations!');
        }
      }
    } catch (e) {
      if (kDebugMode) {
        print('❌ Error force refreshing conversations: $e');
      }
    }
  }

  // ✅ NEW: Debug method to check stream health
  void debugStreamHealth() {
    if (kDebugMode) {
      print('🩺 CHAT SERVICE STREAM HEALTH CHECK:');
      print('  - Instance hash: $hashCode');
      print('  - Current user: $_currentUserId');
      print(
          '  - Stream controller closed: ${_conversationsStreamController.isClosed}');
      print(
          '  - Stream controller hash: ${_conversationsStreamController.hashCode}');
      print('  - Listener started: $_conversationListenerStarted');
      print('  - Stream initialized: $_isStreamInitialized');
      print('  - Cached conversations: ${_cachedConversations.length}');
      print('  - Subscription active: ${_conversationsSubscription != null}');
      if (_cachedConversations.isNotEmpty) {
        print('  - Cached conversation IDs:');
        for (final conv in _cachedConversations) {
          print('    • ${conv.id}');
        }
      }
    }
  }

  // Dispose resources - only call this on app shutdown, not on ChatController disposal
  void dispose() {
    if (kDebugMode) {
      print(
          '⚠️ ChatService.dispose() called - this should only happen on app shutdown');
    }

    // Reset the listener flag to allow restart if service is reinitialized
    _conversationListenerStarted = false;

    // Cancel conversations subscription
    _conversationsSubscription?.cancel();

    // ✅ FIX: Cancel timeout timer
    _conversationsTimeoutTimer?.cancel();

    // Close all message stream controllers
    for (final controller in _messageStreamControllers.values) {
      if (!controller.isClosed) {
        controller.close();
      }
    }
    _messageStreamControllers.clear();

    // Cancel per-conversation Firestore subscriptions
    for (final sub in _messageSubscriptions.values) {
      try {
        sub.cancel();
      } catch (_) {}
    }
    _messageSubscriptions.clear();

    // Cancel auth state subscription
    try {
      _authStateSubscription?.cancel();
    } catch (_) {}

    // ✅ CHANGED: Only close conversations stream controller on explicit disposal
    if (!_conversationsStreamController.isClosed) {
      _conversationsStreamController.close();
    }
  }

  // Clean up message stream controller for a specific conversation
  void cleanupMessageStream(String conversationId) {
    if (_messageStreamControllers.containsKey(conversationId)) {
      final controller = _messageStreamControllers[conversationId]!;
      if (!controller.isClosed) {
        controller.close();
      }
      _messageStreamControllers.remove(conversationId);
    }
    // Also cancel any Firestore subscription for this conversation
    if (_messageSubscriptions.containsKey(conversationId)) {
      try {
        _messageSubscriptions[conversationId]?.cancel();
      } catch (_) {}
      _messageSubscriptions.remove(conversationId);
    }
  }

  // Handle sign-out cleanup to cancel any lingering listeners/subscriptions
  void _handleSignOutCleanup() {
    if (kDebugMode) {
      print('🧹 Handling sign-out cleanup: cancelling message subscriptions');
    }

    // Cancel all per-conversation Firestore subscriptions
    for (final entry in _messageSubscriptions.entries) {
      try {
        entry.value.cancel();
      } catch (_) {}
    }
    _messageSubscriptions.clear();

    // Close all message stream controllers to avoid further adds
    for (final controller in _messageStreamControllers.values) {
      if (!controller.isClosed) {
        try {
          controller.close();
        } catch (_) {}
      }
    }
    _messageStreamControllers.clear();
  }
}
