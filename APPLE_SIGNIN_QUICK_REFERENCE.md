# 🔑 Quick Reference Card - Values You Need

## Copy these EXACT values when configuring:

### 📱 Your App Details:
```
Bundle ID:        com.crowdwave.app.testProject
Service ID:       com.crowdwave.app.testProject.signin
App Name:         CrowdWave
```

### 🏢 Team Information:
```
Development Team: 8GZ776NSU2 (from Xcode project)
Team ID:          725F52JH64 (from App Store crash logs)

⚠️ IMPORTANT: Verify which Team ID is correct!
- Check Apple Developer Console → Membership tab
- Should match what's in your app signing
```

### 🔐 Firebase Configuration:
```
You need to provide these to Firebase:

1. Service ID:       com.crowdwave.app.testProject.signin
2. Team ID:          [GET FROM APPLE DEVELOPER - MEMBERSHIP TAB]
3. Key ID:           [GET AFTER CREATING KEY IN STEP 1B]
4. Private Key:      [CONTENT OF .p8 FILE FROM STEP 1B]
```

### 🌐 Firebase OAuth Redirect URI:
```
You'll get this from Firebase Console, it looks like:
https://[YOUR-PROJECT-ID].firebaseapp.com/__/auth/handler

Example:
https://crowdwave-123abc.firebaseapp.com/__/auth/handler

⚠️ Copy this EXACT URL and add it to:
   Apple Developer → Service ID → Return URLs
```

### 📋 Apple Developer - Where to Add What:

**Service ID Configuration:**
```
Primary App ID:    com.crowdwave.app.testProject
Domain:            [your-project-id].firebaseapp.com
Return URL:        [Firebase OAuth redirect URI from above]
```

---

## 🎯 THE 3 MOST IMPORTANT THINGS:

### 1. GET YOUR KEY ID AND PRIVATE KEY
- Apple Developer Console → Keys → Create New
- Download .p8 file (ONLY ONE CHANCE!)
- Save the Key ID (10 characters)

### 2. CONFIGURE FIREBASE WITH APPLE CREDENTIALS
- Service ID: com.crowdwave.app.testProject.signin
- Team ID: [from Apple]
- Key ID: [from step 1]
- Private Key: [content of .p8 file]

### 3. ADD FIREBASE REDIRECT URI TO APPLE
- Get from Firebase Console
- Add to Apple Developer → Service ID → Return URLs

---

## ✅ Files I Created/Modified for You:

1. ✅ `ios/Runner/Runner.entitlements` - NEW FILE
2. ✅ `ios/Runner.xcodeproj/project.pbxproj` - UPDATED
3. ✅ `APPLE_SIGNIN_CHECKLIST.md` - FULL GUIDE
4. ✅ `APPLE_SIGNIN_QUICK_REFERENCE.md` - THIS FILE

---

## 🚀 Quick Test After Setup:

```bash
cd Flutterrr
flutter clean
flutter pub get
flutter build ios --release
# Then test on real device
```

If it still crashes, check:
1. Team IDs match everywhere
2. Bundle IDs match everywhere  
3. Service ID is correct in Firebase
4. Return URL in Apple matches Firebase exactly
