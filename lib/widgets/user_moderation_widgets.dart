import 'package:flutter/material.dart';
import '../services/moderation_service.dart';

/// Dialog for reporting user-generated content
/// Implements Apple App Store Guideline 1.2 requirements
class ReportUserContentDialog extends StatefulWidget {
  final String reportedUserId;
  final String contentId;
  final String contentType;
  final String? contentPreview;

  const ReportUserContentDialog({
    Key? key,
    required this.reportedUserId,
    required this.contentId,
    required this.contentType,
    this.contentPreview,
  }) : super(key: key);

  @override
  State<ReportUserContentDialog> createState() =>
      _ReportUserContentDialogState();
}

class _ReportUserContentDialogState extends State<ReportUserContentDialog> {
  final _moderationService = ModerationService();
  final _notesController = TextEditingController();
  String? _selectedReason;
  bool _isSubmitting = false;

  @override
  void dispose() {
    _notesController.dispose();
    super.dispose();
  }

  Future<void> _submitReport() async {
    if (_selectedReason == null) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Please select a reason for reporting')),
      );
      return;
    }

    setState(() => _isSubmitting = true);

    try {
      await _moderationService.reportContent(
        reportedUserId: widget.reportedUserId,
        contentId: widget.contentId,
        contentType: widget.contentType,
        reason: _selectedReason!,
        notes: _notesController.text.trim(),
      );

      if (mounted) {
        Navigator.of(context).pop(true);
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(
            content: Text('Thank you. Your report has been submitted.'),
            backgroundColor: Colors.green,
          ),
        );
      }
    } catch (e) {
      if (mounted) {
        setState(() => _isSubmitting = false);
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text('Failed to submit report: ${e.toString()}'),
            backgroundColor: Colors.red,
          ),
        );
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    final reasons = ModerationService.getReportReasons();

    return AlertDialog(
      title: const Text('Report Content'),
      content: SingleChildScrollView(
        child: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            if (widget.contentPreview != null) ...[
              Text(
                'Content:',
                style: Theme.of(context).textTheme.bodySmall,
              ),
              const SizedBox(height: 4),
              Container(
                padding: const EdgeInsets.all(8),
                decoration: BoxDecoration(
                  color: Colors.grey.shade100,
                  borderRadius: BorderRadius.circular(8),
                ),
                child: Text(
                  widget.contentPreview!,
                  style: Theme.of(context).textTheme.bodyMedium,
                  maxLines: 3,
                  overflow: TextOverflow.ellipsis,
                ),
              ),
              const SizedBox(height: 16),
            ],
            Text(
              'Why are you reporting this?',
              style: Theme.of(context).textTheme.titleSmall,
            ),
            const SizedBox(height: 8),
            ...reasons.map((reason) {
              return RadioListTile<String>(
                title: Text(reason['label']!),
                value: reason['value']!,
                groupValue: _selectedReason,
                onChanged: _isSubmitting
                    ? null
                    : (value) => setState(() => _selectedReason = value),
                dense: true,
                contentPadding: EdgeInsets.zero,
              );
            }).toList(),
            const SizedBox(height: 16),
            TextField(
              controller: _notesController,
              decoration: const InputDecoration(
                labelText: 'Additional details (optional)',
                hintText: 'Provide more context...',
                border: OutlineInputBorder(),
              ),
              maxLines: 3,
              maxLength: 500,
              enabled: !_isSubmitting,
            ),
          ],
        ),
      ),
      actions: [
        TextButton(
          onPressed: _isSubmitting ? null : () => Navigator.of(context).pop(),
          child: const Text('Cancel'),
        ),
        ElevatedButton(
          onPressed: _isSubmitting ? null : _submitReport,
          style: ElevatedButton.styleFrom(
            backgroundColor: Colors.red,
            foregroundColor: Colors.white,
          ),
          child: _isSubmitting
              ? const SizedBox(
                  width: 16,
                  height: 16,
                  child: CircularProgressIndicator(
                    strokeWidth: 2,
                    color: Colors.white,
                  ),
                )
              : const Text('Submit Report'),
        ),
      ],
    );
  }
}

/// Dialog for blocking a user
class BlockUserDialog extends StatefulWidget {
  final String userId;
  final String userName;

  const BlockUserDialog({
    Key? key,
    required this.userId,
    required this.userName,
  }) : super(key: key);

  @override
  State<BlockUserDialog> createState() => _BlockUserDialogState();
}

class _BlockUserDialogState extends State<BlockUserDialog> {
  final _moderationService = ModerationService();
  bool _isBlocking = false;

  Future<void> _blockUser() async {
    setState(() => _isBlocking = true);

    try {
      await _moderationService.blockUser(widget.userId);

      if (mounted) {
        Navigator.of(context).pop(true);
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text('${widget.userName} has been blocked'),
            backgroundColor: Colors.green,
          ),
        );
      }
    } catch (e) {
      if (mounted) {
        setState(() => _isBlocking = false);
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text('Failed to block user: ${e.toString()}'),
            backgroundColor: Colors.red,
          ),
        );
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    return AlertDialog(
      title: const Text('Block User'),
      content: Column(
        mainAxisSize: MainAxisSize.min,
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            'Are you sure you want to block ${widget.userName}?',
            style: Theme.of(context).textTheme.bodyLarge,
          ),
          const SizedBox(height: 16),
          Text(
            'Blocked users will not be able to:',
            style: Theme.of(context).textTheme.bodySmall?.copyWith(
                  fontWeight: FontWeight.bold,
                ),
          ),
          const SizedBox(height: 8),
          _buildBulletPoint('Send you messages'),
          _buildBulletPoint('See your posts and comments'),
          _buildBulletPoint('Interact with your content'),
          const SizedBox(height: 8),
          Text(
            'You can unblock them later from settings.',
            style: Theme.of(context).textTheme.bodySmall?.copyWith(
                  color: Colors.grey,
                ),
          ),
        ],
      ),
      actions: [
        TextButton(
          onPressed: _isBlocking ? null : () => Navigator.of(context).pop(),
          child: const Text('Cancel'),
        ),
        ElevatedButton(
          onPressed: _isBlocking ? null : _blockUser,
          style: ElevatedButton.styleFrom(
            backgroundColor: Colors.red,
            foregroundColor: Colors.white,
          ),
          child: _isBlocking
              ? const SizedBox(
                  width: 16,
                  height: 16,
                  child: CircularProgressIndicator(
                    strokeWidth: 2,
                    color: Colors.white,
                  ),
                )
              : const Text('Block User'),
        ),
      ],
    );
  }

  Widget _buildBulletPoint(String text) {
    return Padding(
      padding: const EdgeInsets.only(left: 16, bottom: 4),
      child: Row(
        children: [
          const Icon(Icons.circle, size: 6),
          const SizedBox(width: 8),
          Expanded(
            child: Text(
              text,
              style: Theme.of(context).textTheme.bodySmall,
            ),
          ),
        ],
      ),
    );
  }
}

/// Bottom sheet for content moderation actions
class ModerationActionSheet extends StatelessWidget {
  final String userId;
  final String userName;
  final String? contentId;
  final String? contentType;
  final String? contentPreview;
  final bool showBlockOption;
  final VoidCallback? onReported;
  final VoidCallback? onBlocked;

  const ModerationActionSheet({
    Key? key,
    required this.userId,
    required this.userName,
    this.contentId,
    this.contentType,
    this.contentPreview,
    this.showBlockOption = true,
    this.onReported,
    this.onBlocked,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          if (contentId != null && contentType != null)
            ListTile(
              leading: const Icon(Icons.flag, color: Colors.orange),
              title: const Text('Report Content'),
              subtitle: const Text('Flag this for review'),
              onTap: () async {
                Navigator.pop(context);
                final result = await showDialog<bool>(
                  context: context,
                  builder: (context) => ReportUserContentDialog(
                    reportedUserId: userId,
                    contentId: contentId!,
                    contentType: contentType!,
                    contentPreview: contentPreview,
                  ),
                );
                if (result == true && onReported != null) {
                  onReported!();
                }
              },
            ),
          if (showBlockOption)
            ListTile(
              leading: const Icon(Icons.block, color: Colors.red),
              title: const Text('Block User'),
              subtitle: Text('Stop seeing content from $userName'),
              onTap: () async {
                Navigator.pop(context);
                final result = await showDialog<bool>(
                  context: context,
                  builder: (context) => BlockUserDialog(
                    userId: userId,
                    userName: userName,
                  ),
                );
                if (result == true && onBlocked != null) {
                  onBlocked!();
                }
              },
            ),
          ListTile(
            leading: const Icon(Icons.cancel),
            title: const Text('Cancel'),
            onTap: () => Navigator.pop(context),
          ),
        ],
      ),
    );
  }
}
