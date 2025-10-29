# 🚀 Pre-Deployment Checklist for CodeMagic

## ✅ Code Changes Applied (COMPLETED)

### 1. iOS Info.plist - Added Missing URL Schemes ✅
- ✅ Added Google Sign-In URL scheme: `com.googleusercontent.apps.351442774180-raq4fup332cbcehf6bot46esjhl46qc8`
- ✅ Added Apple Sign-In URL scheme: `com.crowdwave.app.testProject`
- ✅ Facebook URL scheme already configured

### 2. Apple Sign-In Service ID Updated ✅
- ✅ Changed from `com.crowdwave.service` → `com.crowdwave.courier.service`
- ✅ Updated in all 3 files:
  - `lib/services/firebase_auth_service.dart`
  - `lib/services/enhanced_firebase_auth_service.dart`
  - `lib/apple_signin_demo.dart`

---

## ⚠️ CRITICAL: Firebase Console Configuration Required

### You MUST Complete These Steps Before CodeMagic Build:

#### **1. Update iOS GoogleService-Info.plist**

**Current Problem:**
- iOS `GoogleService-Info.plist` has wrong bundle ID: `com.example.loginRegister`
- Should be: `com.crowdwave.app.testProject`

**Fix Steps:**
1. Go to [Firebase Console](https://console.firebase.google.com)
2. Select project: `crowdwave-93d4d`
3. Click gear icon → **Project Settings**
4. Scroll to **Your apps** → Select iOS app
5. **Option A: Update Bundle ID** (if not published yet)
   - Update bundle ID to: `com.crowdwave.app.testProject`
   - Download new `GoogleService-Info.plist`
   - Replace `ios/Runner/GoogleService-Info.plist`
   
   **OR Option B: Match iOS Project to Firebase**
   - Keep Firebase bundle ID as `com.example.loginRegister`
   - Update Xcode project bundle ID to match
   - (Not recommended if already published)

---

#### **2. Configure Apple Sign-In Service ID in Apple Developer Portal**

**Service ID:** `com.crowdwave.courier.service`

**Steps:**
1. Go to [Apple Developer Portal](https://developer.apple.com/account)
2. Navigate to **Certificates, Identifiers & Profiles**
3. Click **Identifiers** → Click **+** (or find existing Service ID)
4. Select **Services IDs** → Continue
5. Create/Edit Service ID:
   - **Identifier:** `com.crowdwave.courier.service`
   - **Description:** CrowdWave Courier Authentication
6. **Enable "Sign In with Apple"**
7. Click **Configure** next to Sign In with Apple:
   - **Primary App ID:** Select your main app ID
   - **Domains and Subdomains:** Add:
     ```
     crowdwave-93d4d.firebaseapp.com
     ```
   - **Return URLs:** Add:
     ```
     https://crowdwave-93d4d.firebaseapp.com/__/auth/handler
     ```
8. Click **Save** → **Continue** → **Register**

---

#### **3. Enable Apple Sign-In in Firebase Console**

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Select project: `crowdwave-93d4d`
3. Go to **Authentication** → **Sign-in method** tab
4. Find **Apple** → Click **Edit**
5. Enable the provider
6. Add OAuth code flow configuration:
   - **Service ID:** `com.crowdwave.courier.service`
   - **Team ID:** (Get from Apple Developer Portal)
   - **Key ID:** (Get from Apple Developer Portal)
   - **Private Key:** (Upload .p8 file from Apple)
7. Click **Save**

---

## 📋 Current Configuration Summary

### Android (Working ✅)
- **Package Name:** `com.crowdwave.courier`
- **Google Services:** Configured correctly
- **Google Sign-In:** ✅ Working
- **Apple Sign-In:** Will work after Apple Developer Portal setup

### iOS (Needs Firebase Update ⚠️)
- **Bundle ID (Xcode):** `com.crowdwave.app.testProject`
- **Bundle ID (Firebase):** `com.example.loginRegister` ❌ MISMATCH
- **Google Sign-In:** Will work after GoogleService-Info.plist update
- **Apple Sign-In:** Will work after Service ID setup
- **URL Schemes:** ✅ Fixed

---

## 🎯 Pre-Push Checklist

Before pushing to GitHub and triggering CodeMagic:

- [ ] **CRITICAL:** Update iOS `GoogleService-Info.plist` with correct bundle ID
- [ ] **CRITICAL:** Configure Apple Service ID `com.crowdwave.courier.service` in Apple Developer Portal
- [ ] **CRITICAL:** Enable Apple Sign-In in Firebase Console with Service ID
- [ ] Test Google Sign-In on both platforms locally
- [ ] Test Apple Sign-In on both platforms locally
- [ ] Verify no compilation errors: `flutter clean && flutter pub get`
- [ ] Check iOS build: `cd ios && pod install && cd ..`

---

## 🔧 Quick Test Commands

```bash
# Clean and rebuild
flutter clean
flutter pub get

# iOS pod install
cd ios && pod install && cd ..

# Test build
flutter build apk --release
flutter build ios --release --no-codesign
```

---

## 🚨 What Will Happen If You Skip Firebase Update

### Without GoogleService-Info.plist Update:
- ❌ Google Sign-In will **FAIL on iOS**
- ❌ Firebase services may not work correctly on iOS
- ✅ Android will continue working (already correct)

### Without Apple Service ID Configuration:
- ❌ Apple Sign-In will **FAIL on Android** (browser error)
- ❌ Apple Sign-In will **FAIL on iOS**
- The error will be: "Unable to process request due to missing initial state"

---

## 📞 Summary

**Code Changes:** ✅ COMPLETE - Ready to push
**Firebase Setup:** ⚠️ REQUIRED BEFORE DEPLOYMENT

**Estimated Time to Complete Firebase Setup:** 15-20 minutes

Once Firebase configuration is complete, you're **100% ready** for CodeMagic deployment! 🚀
