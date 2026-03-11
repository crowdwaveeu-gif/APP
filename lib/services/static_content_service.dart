import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'dart:convert';

enum StaticContentType {
  termsOfService,
  privacyPolicy,
  faq,
}

class StaticContent {
  final String id;
  final StaticContentType type;
  final String title;
  final String content;
  final DateTime lastUpdated;
  final String updatedBy;
  final int version;
  final bool isPublished;

  StaticContent({
    required this.id,
    required this.type,
    required this.title,
    required this.content,
    required this.lastUpdated,
    required this.updatedBy,
    required this.version,
    required this.isPublished,
  });

  factory StaticContent.fromFirestore(DocumentSnapshot doc) {
    final data = doc.data() as Map<String, dynamic>;
    return StaticContent(
      id: doc.id,
      type: _parseContentType(data['type'] as String),
      title: data['title'] as String? ?? '',
      content: data['content'] as String? ?? '',
      lastUpdated:
          (data['lastUpdated'] as Timestamp?)?.toDate() ?? DateTime.now(),
      updatedBy: data['updatedBy'] as String? ?? '',
      version: data['version'] as int? ?? 1,
      isPublished: data['isPublished'] as bool? ?? false,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'type': _contentTypeToString(type),
      'title': title,
      'content': content,
      'lastUpdated': lastUpdated.toIso8601String(),
      'updatedBy': updatedBy,
      'version': version,
      'isPublished': isPublished,
    };
  }

  factory StaticContent.fromJson(Map<String, dynamic> json) {
    return StaticContent(
      id: json['id'] as String,
      type: _parseContentType(json['type'] as String),
      title: json['title'] as String,
      content: json['content'] as String,
      lastUpdated: DateTime.parse(json['lastUpdated'] as String),
      updatedBy: json['updatedBy'] as String,
      version: json['version'] as int,
      isPublished: json['isPublished'] as bool,
    );
  }

  static StaticContentType _parseContentType(String type) {
    switch (type) {
      case 'terms_of_service':
        return StaticContentType.termsOfService;
      case 'privacy_policy':
        return StaticContentType.privacyPolicy;
      case 'faq':
        return StaticContentType.faq;
      default:
        return StaticContentType.termsOfService;
    }
  }

  static String _contentTypeToString(StaticContentType type) {
    switch (type) {
      case StaticContentType.termsOfService:
        return 'terms_of_service';
      case StaticContentType.privacyPolicy:
        return 'privacy_policy';
      case StaticContentType.faq:
        return 'faq';
    }
  }
}

class StaticContentService {
  static const String _collectionName = 'staticContent';
  static const String _cachePrefix = 'static_content_';
  static const Duration _cacheExpiration = Duration(hours: 24);

  final FirebaseFirestore _firestore = FirebaseFirestore.instance;

  /// Get content by type with caching
  Future<StaticContent?> getContentByType(StaticContentType type) async {
    try {
      // Try to get from cache first
      final cachedContent = await _getCachedContent(type);
      if (cachedContent != null) {
        return cachedContent;
      }

      // If not in cache, fetch from Firestore
      final typeString = StaticContent._contentTypeToString(type);
      final querySnapshot = await _firestore
          .collection(_collectionName)
          .where('type', isEqualTo: typeString)
          .where('isPublished', isEqualTo: true)
          .limit(1)
          .get();

      if (querySnapshot.docs.isEmpty) {
        return null;
      }

      final content = StaticContent.fromFirestore(querySnapshot.docs.first);

      // Cache the content
      await _cacheContent(type, content);

      return content;
    } catch (e) {
      print('Error fetching static content: $e');
      return null;
    }
  }

  /// Get all published static content
  Future<List<StaticContent>> getAllPublishedContent() async {
    try {
      final querySnapshot = await _firestore
          .collection(_collectionName)
          .where('isPublished', isEqualTo: true)
          .orderBy('type')
          .get();

      return querySnapshot.docs
          .map((doc) => StaticContent.fromFirestore(doc))
          .toList();
    } catch (e) {
      print('Error fetching all static content: $e');
      return [];
    }
  }

  /// Cache content locally
  Future<void> _cacheContent(
      StaticContentType type, StaticContent content) async {
    try {
      final prefs = await SharedPreferences.getInstance();
      final cacheKey = _getCacheKey(type);
      final cacheData = {
        'content': content.toJson(),
        'cachedAt': DateTime.now().toIso8601String(),
      };
      await prefs.setString(cacheKey, jsonEncode(cacheData));
    } catch (e) {
      print('Error caching content: $e');
    }
  }

  /// Get cached content
  Future<StaticContent?> _getCachedContent(StaticContentType type) async {
    try {
      final prefs = await SharedPreferences.getInstance();
      final cacheKey = _getCacheKey(type);
      final cachedString = prefs.getString(cacheKey);

      if (cachedString == null) {
        return null;
      }

      final cacheData = jsonDecode(cachedString) as Map<String, dynamic>;
      final cachedAt = DateTime.parse(cacheData['cachedAt'] as String);

      // Check if cache is expired
      if (DateTime.now().difference(cachedAt) > _cacheExpiration) {
        await prefs.remove(cacheKey);
        return null;
      }

      return StaticContent.fromJson(
          cacheData['content'] as Map<String, dynamic>);
    } catch (e) {
      print('Error getting cached content: $e');
      return null;
    }
  }

  /// Clear cache for specific type
  Future<void> clearCache(StaticContentType type) async {
    try {
      final prefs = await SharedPreferences.getInstance();
      await prefs.remove(_getCacheKey(type));
    } catch (e) {
      print('Error clearing cache: $e');
    }
  }

  /// Clear all cached content
  Future<void> clearAllCache() async {
    try {
      final prefs = await SharedPreferences.getInstance();
      for (var type in StaticContentType.values) {
        await prefs.remove(_getCacheKey(type));
      }
    } catch (e) {
      print('Error clearing all cache: $e');
    }
  }

  String _getCacheKey(StaticContentType type) {
    return '$_cachePrefix${StaticContent._contentTypeToString(type)}';
  }

  /// Get default content for a type (fallback when content is not available)
  String getDefaultContent(StaticContentType type) {
    switch (type) {
      case StaticContentType.termsOfService:
        return '<h2>Terms of Service</h2><p>Our Terms of Service are currently being updated. Please check back later.</p>';
      case StaticContentType.privacyPolicy:
        return '<h2>Privacy Policy</h2><p>Our Privacy Policy is currently being updated. Please check back later.</p>';
      case StaticContentType.faq:
        return '<h2>Frequently Asked Questions</h2><p>Our FAQ section is currently being updated. Please check back later.</p>';
    }
  }

  /// Get default title for a type
  String getDefaultTitle(StaticContentType type) {
    switch (type) {
      case StaticContentType.termsOfService:
        return 'Terms of Service';
      case StaticContentType.privacyPolicy:
        return 'Privacy Policy';
      case StaticContentType.faq:
        return 'Frequently Asked Questions';
    }
  }
}
