import 'dart:async';
import 'package:flutter/foundation.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:agora_rtc_engine/agora_rtc_engine.dart';
import 'package:permission_handler/permission_handler.dart';
import 'notification_service.dart';
import '../utils/agora_token_generator.dart';

/// 🎤 Agora Voice Call Service
/// Free tier: 10,000 minutes/month FOREVER!
class AgoraVoiceCallService {
  static final AgoraVoiceCallService _instance =
      AgoraVoiceCallService._internal();
  factory AgoraVoiceCallService() => _instance;
  AgoraVoiceCallService._internal();

  // 🔑 AGORA CONFIGURATION
  static const String appId = 'db2ca44a159b4e079483a662e32777e5';

  // 🔐 APP CERTIFICATE (Get from Agora Console > Project Management > Config)
  // ⚠️ IMPORTANT: In production, generate tokens on your backend server
  static const String appCertificate = 'e7a1b5ba363d4519bf6fa9e4853aec78';
  // Token authentication now enabled for secure calls!

  final FirebaseFirestore _firestore = FirebaseFirestore.instance;
  final FirebaseAuth _auth = FirebaseAuth.instance;
  final NotificationService _notificationService = NotificationService.instance;

  RtcEngine? _engine;
  bool _isEngineInitialized = false;
  String? _currentChannelName;
  int? _currentUid;

  // Getters
  bool get isEngineInitialized => _isEngineInitialized;
  String? get currentUserId => _auth.currentUser?.uid;
  String? get currentChannelName => _currentChannelName;

  /// 🚀 Initialize Agora Engine
  Future<void> createEngine() async {
    if (_isEngineInitialized && _engine != null) {
      if (kDebugMode) {
        print('✅ Agora Engine already initialized');
      }
      return;
    }

    try {
      // Request permissions
      await _requestPermissions();

      // Create Agora engine
      _engine = createAgoraRtcEngine();
      await _engine!.initialize(RtcEngineContext(
        appId: appId,
        channelProfile: ChannelProfileType.channelProfileCommunication,
      ));

      // Set up event handlers
      _setupEventHandlers();

      // Enable audio (disable video for voice-only calls)
      await _engine!.enableAudio();
      await _engine!.disableVideo();

      _isEngineInitialized = true;

      if (kDebugMode) {
        print('✅ Agora Voice Call Service Ready');
        print('🔑 App ID: $appId');
        print('📱 Free tier: 10,000 minutes/month forever!');
      }
    } catch (e) {
      if (kDebugMode) {
        print('❌ Failed to initialize Agora Engine: $e');
      }
      rethrow;
    }
  }

  /// 🔐 Request necessary permissions
  Future<void> _requestPermissions() async {
    await [
      Permission.microphone,
    ].request();
  }

  /// 📡 Set up event handlers
  void _setupEventHandlers() {
    if (_engine == null) return;

    _engine!.registerEventHandler(
      RtcEngineEventHandler(
        onError: (ErrorCodeType err, String msg) {
          if (kDebugMode) {
            print('❌ Agora Error: $err - $msg');
          }
        },
        onJoinChannelSuccess: (RtcConnection connection, int elapsed) {
          if (kDebugMode) {
            print('✅ Joined channel: ${connection.channelId}');
            print('👤 Local UID: ${connection.localUid}');
          }
          _currentUid = connection.localUid;
        },
        onUserJoined: (RtcConnection connection, int remoteUid, int elapsed) {
          if (kDebugMode) {
            print('👤 User joined: $remoteUid');
          }
        },
        onUserOffline: (RtcConnection connection, int remoteUid,
            UserOfflineReasonType reason) {
          if (kDebugMode) {
            print('👋 User left: $remoteUid, reason: $reason');
          }
        },
        onLeaveChannel: (RtcConnection connection, RtcStats stats) {
          if (kDebugMode) {
            print('👋 Left channel: ${connection.channelId}');
          }
          _currentChannelName = null;
          _currentUid = null;
        },
      ),
    );
  }

  /// 🚪 Join voice channel
  Future<void> joinChannel({
    required String channelName,
    required String userID,
  }) async {
    if (_engine == null || !_isEngineInitialized) {
      throw Exception(
          'Agora Engine not initialized. Call createEngine() first.');
    }

    try {
      // Leave current channel if already in one
      if (_currentChannelName != null) {
        if (kDebugMode) {
          print('⚠️ Already in channel $_currentChannelName, leaving first...');
        }
        await leaveChannel();
        await Future.delayed(const Duration(milliseconds: 500));
      }

      String? token;
      int uid = 0; // 0 means Agora will assign a UID

      // Generate token if app certificate is configured
      if (appCertificate.isNotEmpty) {
        try {
          token = AgoraTokenGenerator.generateRtcToken(
            appId: appId,
            appCertificate: appCertificate,
            channelName: channelName,
            uid: uid,
            role: RtcRole.publisher,
            expireTime: 86400, // 24 hours
          );

          if (kDebugMode) {
            print('🔐 Generated Agora token for channel: $channelName');
          }
        } catch (e) {
          if (kDebugMode) {
            print('⚠️ Failed to generate token: $e');
            print(
                '💡 Continuing without token (works if token authentication is disabled)');
          }
        }
      }

      if (kDebugMode) {
        print('🚪 Joining Agora channel: $channelName');
        print('👤 User ID: $userID');
        print('🔐 Token: ${token != null ? "✅ Enabled" : "❌ Disabled"}');
      }

      // Join channel
      await _engine!.joinChannel(
        token: token ?? '',
        channelId: channelName,
        uid: uid,
        options: const ChannelMediaOptions(
          channelProfile: ChannelProfileType.channelProfileCommunication,
          clientRoleType: ClientRoleType.clientRoleBroadcaster,
          autoSubscribeAudio: true,
          autoSubscribeVideo: false,
          publishMicrophoneTrack: true,
          publishCameraTrack: false,
        ),
      );

      _currentChannelName = channelName;

      if (kDebugMode) {
        print('✅ Successfully joining channel: $channelName');
      }
    } catch (e) {
      if (kDebugMode) {
        print('❌ Failed to join channel: $e');
      }
      rethrow;
    }
  }

  /// 🚪 Leave voice channel
  Future<void> leaveChannel() async {
    if (_engine == null) return;

    try {
      await _engine!.leaveChannel();
      _currentChannelName = null;
      _currentUid = null;

      if (kDebugMode) {
        print('✅ Left voice channel');
      }
    } catch (e) {
      if (kDebugMode) {
        print('❌ Failed to leave channel: $e');
      }
    }
  }

  /// 🔇 Mute/unmute microphone
  Future<void> muteMicrophone(bool mute) async {
    if (_engine == null) return;

    try {
      await _engine!.muteLocalAudioStream(mute);

      if (kDebugMode) {
        print('🎤 Microphone ${mute ? 'muted' : 'unmuted'}');
      }
    } catch (e) {
      if (kDebugMode) {
        print('❌ Failed to mute/unmute microphone: $e');
      }
    }
  }

  /// 🔊 Enable/disable speaker
  Future<void> enableSpeaker(bool enable) async {
    if (_engine == null) return;

    try {
      await _engine!.setEnableSpeakerphone(enable);

      if (kDebugMode) {
        print('🔊 Speaker ${enable ? 'enabled' : 'disabled'}');
      }
    } catch (e) {
      if (kDebugMode) {
        print('❌ Failed to enable/disable speaker: $e');
      }
    }
  }

  /// 📱 Start voice call
  Future<String> startVoiceCall({
    required String callID,
    required String receiverId,
    required String receiverName,
  }) async {
    final currentUser = _auth.currentUser;
    if (currentUser == null) {
      throw Exception('User must be logged in to make calls');
    }

    try {
      // Create unique channel name (alphanumeric only)
      final timestamp = DateTime.now().millisecondsSinceEpoch;
      final channelName = 'voice${callID}$timestamp';

      if (kDebugMode) {
        print('🎤 Creating Agora voice call channel: $channelName');
        print('📏 Channel name length: ${channelName.length} chars');
      }

      // Send call notification to Firebase
      await _sendCallNotification(
        callType: 'voice',
        callID: channelName,
        receiverId: receiverId,
        receiverName: receiverName,
      );

      if (kDebugMode) {
        print('🎤 Voice call initiated: $channelName to $receiverName');
      }

      return channelName;
    } catch (e) {
      if (kDebugMode) {
        print('❌ Voice call error: $e');
      }
      rethrow;
    }
  }

  /// 📧 Send call notification via Firebase
  Future<void> _sendCallNotification({
    required String callType,
    required String callID,
    required String receiverId,
    required String receiverName,
  }) async {
    final currentUser = _auth.currentUser;
    if (currentUser == null) return;

    try {
      // Save call notification to Firestore
      await _firestore.collection('call_notifications').doc(callID).set({
        'callType': callType,
        'callID': callID,
        'senderId': currentUser.uid,
        'senderName': currentUser.displayName ?? 'Unknown',
        'receiverId': receiverId,
        'receiverName': receiverName,
        'timestamp': FieldValue.serverTimestamp(),
        'status': 'calling',
        'message': '${currentUser.displayName} is calling you...',
      });

      // Send push notification to receiver
      await _notificationService.notifyIncomingVoiceCall(
        receiverId: receiverId,
        callerName: currentUser.displayName ?? 'Unknown User',
        callId: callID,
        roomId: callID,
        callerId: currentUser.uid,
      );

      if (kDebugMode) {
        print('✅ Call notification sent successfully!');
        print('📞 From: ${currentUser.displayName}');
        print('📱 To: $receiverName');
        print('🎤 Channel: $callID');
      }
    } catch (e) {
      if (kDebugMode) {
        print('❌ Failed to send call notification: $e');
      }
    }
  }

  /// 🧹 Dispose engine
  Future<void> dispose() async {
    try {
      await leaveChannel();
      await _engine?.release();
      _engine = null;
      _isEngineInitialized = false;

      if (kDebugMode) {
        print('🧹 Agora Engine disposed');
      }
    } catch (e) {
      if (kDebugMode) {
        print('❌ Error disposing Agora Engine: $e');
      }
    }
  }
}
