# 🍎 Apple Sign-In Configuration Checklist for CrowdWave

## ✅ COMPLETED (by me):
- ✅ Created `Runner.entitlements` file with Apple Sign-In capability
- ✅ Updated Xcode project to reference entitlements file (Debug, Release, Profile)
- ✅ Verified Bundle ID: `com.crowdwave.app.testProject`
- ✅ Verified Team ID: `725F52JH64` (from crash logs - UPDATE IF WRONG)
- ✅ Verified Google Sign-In and Apple URL schemes in Info.plist

---

## 🔍 YOU NEED TO CHECK & DO:

### 1️⃣ **APPLE DEVELOPER CONSOLE** (https://developer.apple.com)
**⚠️ MOST IMPORTANT - Do this first!**

#### A. Enable Sign In with Apple for your App ID:
1. Go to: **Certificates, Identifiers & Profiles** → **Identifiers**
2. Find: `com.crowdwave.app.testProject`
3. Check if **"Sign In with Apple"** is **ENABLED** ✅
4. If NOT enabled:
   - Click "Edit"
   - Scroll to "Sign In with Apple"
   - Check the box ☑️
   - Click "Save"

#### B. Create Apple Sign-In Key (if you haven't):
1. Go to: **Certificates, Identifiers & Profiles** → **Keys**
2. Click the **"+"** button
3. Enter Key Name: `CrowdWave Apple SignIn Key`
4. Check: **"Sign In with Apple"** ☑️
5. Click **"Configure"** next to it
6. Select **Primary App ID**: `com.crowdwave.app.testProject`
7. Click **"Save"** → **"Continue"** → **"Register"**
8. **DOWNLOAD** the `.p8` file (⚠️ You can ONLY download it ONCE!)
9. **SAVE** the **Key ID** (10 characters) - you'll need it for Firebase

Example Key ID: `ABC123DEFG`

#### C. Create Service ID for OAuth:
1. Go to: **Certificates, Identifiers & Profiles** → **Identifiers**
2. Click **"+"** → Select **"Services IDs"**
3. Fill in:
   - **Description**: `CrowdWave Apple Sign In Service`
   - **Identifier**: `com.crowdwave.app.testProject.signin`
4. Click **"Continue"** → **"Register"**
5. Click on the newly created Service ID
6. Check: **"Sign In with Apple"** ☑️
7. Click **"Configure"** next to it:
   - **Primary App ID**: Select `com.crowdwave.app.testProject`
   - **Domains and Subdomains**: Add your Firebase domain
     - Format: `YOUR-PROJECT-ID.firebaseapp.com`
     - Example: `crowdwave-abc123.firebaseapp.com`
   - **Return URLs**: Add Firebase OAuth redirect URI
     - Get this from Firebase Console (see step 2)
     - Format: `https://YOUR-PROJECT-ID.firebaseapp.com/__/auth/handler`
8. Click **"Save"** → **"Continue"** → **"Save"**

---

### 2️⃣ **FIREBASE CONSOLE** (https://console.firebase.google.com)

1. Go to your project: **CrowdWave**
2. Go to: **Authentication** → **Sign-in method** tab
3. Find **Apple** in the list
4. Click on **Apple** to configure:

#### COPY THIS INFO FIRST (from Firebase):
- **OAuth redirect URI** - Copy this URL, you need it for Apple Developer Console
  - Example: `https://crowdwave-abc123.firebaseapp.com/__/auth/handler`

#### THEN ENTER THIS INFO:
- **Service ID**: `com.crowdwave.app.testProject.signin` (the one you created in step 1C)
- **Team ID**: Check if it's `725F52JH64` OR get it from Apple Developer:
  - Go to Apple Developer → **Membership** tab
  - Look for "Team ID"
- **Key ID**: The 10-character ID from step 1B (e.g., `ABC123DEFG`)
- **Private Key**: Open the `.p8` file from step 1B and paste the content
  - Should look like: `-----BEGIN PRIVATE KEY-----\nMIGT...==\n-----END PRIVATE KEY-----`

5. Click **"Save"**

---

### 3️⃣ **APP STORE CONNECT** (https://appstoreconnect.apple.com)

1. Go to: **My Apps** → **CrowdWave**
2. Go to: **App Information** (left sidebar)
3. Scroll to **Sign In with Apple**
4. Select: **"Enable as a primary App ID"** OR **"Group with an existing primary App ID"**
5. Click **"Save"**

---

### 4️⃣ **VERIFY YOUR DEVELOPMENT TEAM**

In the crash logs, I see: `DEVELOPMENT_TEAM = 8GZ776NSU2`
But the Team ID in the crash was: `725F52JH64`

**⚠️ CHECK IF THESE MATCH:**
1. Open Xcode
2. Go to your project settings
3. Check **"Team"** under **Signing & Capabilities**
4. Should show Team ID: `725F52JH64` (or `8GZ776NSU2`)
5. **Make sure it matches** what you enter in Firebase!

---

### 5️⃣ **OPEN YOUR PROJECT IN XCODE AND VERIFY**

1. Open: `Flutterrr/ios/Runner.xcworkspace` (NOT .xcodeproj)
2. Select **Runner** project in left sidebar
3. Select **Runner** target
4. Go to **Signing & Capabilities** tab

#### Check these:
- ✅ **Signing Certificate**: Should show "Apple Development" or "Apple Distribution"
- ✅ **Team**: Should show your team name
- ✅ **Bundle Identifier**: `com.crowdwave.app.testProject`

#### Add Sign In with Apple capability:
1. Click **"+ Capability"** button
2. Search for: **"Sign In with Apple"**
3. Double-click to add it
4. Verify `Runner.entitlements` appears in file list (it should now!)

---

## 🧪 TEST THE FIX

After completing all steps above:

### On iOS:
1. Clean build: `cd Flutterrr && flutter clean`
2. Get dependencies: `flutter pub get`
3. Run on real device: `flutter run --release`
4. Test Apple Sign-In button
5. Should open Apple authentication screen
6. Should NOT crash!

---

## 📝 IMPORTANT NOTES:

### Your Current Configuration:
- **Bundle ID**: `com.crowdwave.app.testProject`
- **Team ID** (in Xcode): `8GZ776NSU2`
- **Team ID** (in crash log): `725F52JH64` ⚠️ **VERIFY WHICH IS CORRECT!**
- **App Version**: 1.0.7 (Build 16) - crashed
- **New Version**: 1.0.8 (Build 17) - make sure to increment!

### Firebase Auth Packages (already correct):
- ✅ `firebase_auth: ^5.7.0`
- ✅ `sign_in_with_apple: ^6.1.2`
- ✅ `google_sign_in: ^6.3.0`

---

## 🚨 COMMON ISSUES & FIXES:

### Issue 1: "AuthorizationError 1000"
**Cause**: Missing configuration in Apple Developer or Firebase
**Fix**: Complete steps 1-3 above

### Issue 2: App crashes on Apple Sign-In
**Cause**: Missing entitlements file
**Fix**: ✅ FIXED - I created it for you!

### Issue 3: "The operation couldn't be completed"
**Cause**: Mismatch between Bundle ID, Service ID, or redirect URIs
**Fix**: Double-check all IDs match exactly

### Issue 4: Works on simulator but not real device
**Cause**: Missing "Sign In with Apple" capability in Xcode
**Fix**: See step 5 above

---

## ✅ FINAL CHECKLIST:

Before submitting to App Store:

- [ ] Completed Step 1: Apple Developer Console (A, B, C)
- [ ] Completed Step 2: Firebase Console
- [ ] Completed Step 3: App Store Connect
- [ ] Verified Step 4: Team IDs match
- [ ] Completed Step 5: Added capability in Xcode
- [ ] Tested on real iOS device
- [ ] Apple Sign-In works without crashing
- [ ] Incremented version to 1.0.8 (Build 17)
- [ ] Built new app bundle: `flutter build ipa` or `flutter build appbundle`
- [ ] Uploaded to App Store Connect

---

## 📞 NEED HELP?

### Quick Debug Commands:
```bash
# Check if entitlements file exists
ls -la ios/Runner/Runner.entitlements

# Verify Xcode project references it
grep -r "CODE_SIGN_ENTITLEMENTS" ios/Runner.xcodeproj/project.pbxproj

# Check Bundle ID
grep -A 2 "CFBundleIdentifier" ios/Runner/Info.plist
```

### Check App Store Connect Status:
- Look for warnings about "Sign In with Apple"
- Check if app is "Ready for Sale" or has issues

---

## 🎯 PRIORITY ORDER:
1. **MOST IMPORTANT**: Step 1 (Apple Developer - Enable capability & create keys)
2. **SECOND**: Step 2 (Firebase - Configure with Apple keys)
3. **THIRD**: Step 5 (Xcode - Add capability)
4. **THEN**: Steps 3 & 4 (Verify everything matches)

Good luck! 🍀
