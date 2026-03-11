import 'package:flutter/material.dart';
import 'package:flutter_html/flutter_html.dart';
import '../../services/static_content_service.dart';

class StaticContentViewer extends StatefulWidget {
  final StaticContentType contentType;
  final String? customTitle;

  const StaticContentViewer({
    Key? key,
    required this.contentType,
    this.customTitle,
  }) : super(key: key);

  @override
  State<StaticContentViewer> createState() => _StaticContentViewerState();
}

class _StaticContentViewerState extends State<StaticContentViewer> {
  final StaticContentService _contentService = StaticContentService();
  StaticContent? _content;
  bool _isLoading = true;
  String? _error;

  @override
  void initState() {
    super.initState();
    _loadContent();
  }

  Future<void> _loadContent() async {
    setState(() {
      _isLoading = true;
      _error = null;
    });

    try {
      final content =
          await _contentService.getContentByType(widget.contentType);
      setState(() {
        _content = content;
        _isLoading = false;
      });
    } catch (e) {
      setState(() {
        _error = 'Failed to load content. Please try again later.';
        _isLoading = false;
      });
      print('Error loading static content: $e');
    }
  }

  @override
  Widget build(BuildContext context) {
    final title = widget.customTitle ??
        _content?.title ??
        _contentService.getDefaultTitle(widget.contentType);

    return Scaffold(
      appBar: AppBar(
        title: Text(title),
        elevation: 0,
      ),
      body: _buildBody(),
    );
  }

  Widget _buildBody() {
    if (_isLoading) {
      return const Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            CircularProgressIndicator(),
            SizedBox(height: 16),
            Text(
              'Loading content...',
              style: TextStyle(color: Colors.grey),
            ),
          ],
        ),
      );
    }

    if (_error != null) {
      return Center(
        child: Padding(
          padding: const EdgeInsets.all(24.0),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Icon(
                Icons.error_outline,
                size: 64,
                color: Colors.red.shade300,
              ),
              const SizedBox(height: 16),
              Text(
                _error!,
                textAlign: TextAlign.center,
                style: const TextStyle(
                  fontSize: 16,
                  color: Colors.grey,
                ),
              ),
              const SizedBox(height: 24),
              ElevatedButton.icon(
                onPressed: _loadContent,
                icon: const Icon(Icons.refresh),
                label: const Text('Retry'),
              ),
            ],
          ),
        ),
      );
    }

    final contentHtml = _content?.content ??
        _contentService.getDefaultContent(widget.contentType);

    return SingleChildScrollView(
      padding: const EdgeInsets.all(16.0),
      child: Html(
        data: contentHtml,
        style: {
          'body': Style(
            fontSize: FontSize(16),
            lineHeight: LineHeight(1.6),
          ),
          'h1': Style(
            fontSize: FontSize(24),
            fontWeight: FontWeight.bold,
            margin: Margins.only(top: 16, bottom: 12),
          ),
          'h2': Style(
            fontSize: FontSize(20),
            fontWeight: FontWeight.bold,
            margin: Margins.only(top: 14, bottom: 10),
          ),
          'h3': Style(
            fontSize: FontSize(18),
            fontWeight: FontWeight.w600,
            margin: Margins.only(top: 12, bottom: 8),
          ),
          'p': Style(
            margin: Margins.only(bottom: 12),
          ),
          'ul': Style(
            margin: Margins.only(left: 8, bottom: 12),
          ),
          'ol': Style(
            margin: Margins.only(left: 8, bottom: 12),
          ),
          'li': Style(
            margin: Margins.only(bottom: 6),
          ),
          'a': Style(
            color: const Color(0xFF008080),
            textDecoration: TextDecoration.underline,
          ),
          'strong': Style(
            fontWeight: FontWeight.bold,
          ),
          'em': Style(
            fontStyle: FontStyle.italic,
          ),
        },
      ),
    );
  }
}

/// Helper function to show static content in a modal bottom sheet
void showStaticContentSheet(
  BuildContext context,
  StaticContentType contentType, {
  String? customTitle,
}) {
  showModalBottomSheet(
    context: context,
    isScrollControlled: true,
    shape: const RoundedRectangleBorder(
      borderRadius: BorderRadius.vertical(top: Radius.circular(20)),
    ),
    builder: (context) {
      return DraggableScrollableSheet(
        initialChildSize: 0.9,
        minChildSize: 0.5,
        maxChildSize: 0.95,
        expand: false,
        builder: (context, scrollController) {
          return StaticContentBottomSheet(
            contentType: contentType,
            customTitle: customTitle,
            scrollController: scrollController,
          );
        },
      );
    },
  );
}

/// Bottom sheet version of static content viewer
class StaticContentBottomSheet extends StatefulWidget {
  final StaticContentType contentType;
  final String? customTitle;
  final ScrollController scrollController;

  const StaticContentBottomSheet({
    Key? key,
    required this.contentType,
    required this.scrollController,
    this.customTitle,
  }) : super(key: key);

  @override
  State<StaticContentBottomSheet> createState() =>
      _StaticContentBottomSheetState();
}

class _StaticContentBottomSheetState extends State<StaticContentBottomSheet> {
  final StaticContentService _contentService = StaticContentService();
  StaticContent? _content;
  bool _isLoading = true;
  String? _error;

  @override
  void initState() {
    super.initState();
    _loadContent();
  }

  Future<void> _loadContent() async {
    setState(() {
      _isLoading = true;
      _error = null;
    });

    try {
      final content =
          await _contentService.getContentByType(widget.contentType);
      setState(() {
        _content = content;
        _isLoading = false;
      });
    } catch (e) {
      setState(() {
        _error = 'Failed to load content. Please try again later.';
        _isLoading = false;
      });
      print('Error loading static content: $e');
    }
  }

  @override
  Widget build(BuildContext context) {
    final title = widget.customTitle ??
        _content?.title ??
        _contentService.getDefaultTitle(widget.contentType);

    return Container(
      decoration: const BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.vertical(top: Radius.circular(20)),
      ),
      child: Column(
        children: [
          // Handle bar
          Container(
            margin: const EdgeInsets.only(top: 12),
            width: 40,
            height: 4,
            decoration: BoxDecoration(
              color: Colors.grey.shade300,
              borderRadius: BorderRadius.circular(2),
            ),
          ),
          // Title
          Padding(
            padding: const EdgeInsets.all(16.0),
            child: Row(
              children: [
                Expanded(
                  child: Text(
                    title,
                    style: const TextStyle(
                      fontSize: 20,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                ),
                IconButton(
                  onPressed: () => Navigator.pop(context),
                  icon: const Icon(Icons.close),
                ),
              ],
            ),
          ),
          const Divider(height: 1),
          // Content
          Expanded(
            child: _buildBody(),
          ),
        ],
      ),
    );
  }

  Widget _buildBody() {
    if (_isLoading) {
      return const Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            CircularProgressIndicator(),
            SizedBox(height: 16),
            Text(
              'Loading content...',
              style: TextStyle(color: Colors.grey),
            ),
          ],
        ),
      );
    }

    if (_error != null) {
      return Center(
        child: Padding(
          padding: const EdgeInsets.all(24.0),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Icon(
                Icons.error_outline,
                size: 64,
                color: Colors.red.shade300,
              ),
              const SizedBox(height: 16),
              Text(
                _error!,
                textAlign: TextAlign.center,
                style: const TextStyle(
                  fontSize: 16,
                  color: Colors.grey,
                ),
              ),
              const SizedBox(height: 24),
              ElevatedButton.icon(
                onPressed: _loadContent,
                icon: const Icon(Icons.refresh),
                label: const Text('Retry'),
              ),
            ],
          ),
        ),
      );
    }

    final contentHtml = _content?.content ??
        _contentService.getDefaultContent(widget.contentType);

    return SingleChildScrollView(
      controller: widget.scrollController,
      padding: const EdgeInsets.all(16.0),
      child: Html(
        data: contentHtml,
        style: {
          'body': Style(
            fontSize: FontSize(16),
            lineHeight: LineHeight(1.6),
          ),
          'h1': Style(
            fontSize: FontSize(24),
            fontWeight: FontWeight.bold,
            margin: Margins.only(top: 16, bottom: 12),
          ),
          'h2': Style(
            fontSize: FontSize(20),
            fontWeight: FontWeight.bold,
            margin: Margins.only(top: 14, bottom: 10),
          ),
          'h3': Style(
            fontSize: FontSize(18),
            fontWeight: FontWeight.w600,
            margin: Margins.only(top: 12, bottom: 8),
          ),
          'p': Style(
            margin: Margins.only(bottom: 12),
          ),
          'ul': Style(
            margin: Margins.only(left: 8, bottom: 12),
          ),
          'ol': Style(
            margin: Margins.only(left: 8, bottom: 12),
          ),
          'li': Style(
            margin: Margins.only(bottom: 6),
          ),
          'a': Style(
            color: const Color(0xFF008080),
            textDecoration: TextDecoration.underline,
          ),
          'strong': Style(
            fontWeight: FontWeight.bold,
          ),
          'em': Style(
            fontStyle: FontStyle.italic,
          ),
        },
      ),
    );
  }
}
