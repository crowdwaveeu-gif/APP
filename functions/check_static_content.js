// Quick script to check staticContent in Firestore
const admin = require('firebase-admin');

// Initialize Firebase Admin (use default credentials)
if (!admin.apps.length) {
  admin.initializeApp();
}

const db = admin.firestore();

async function checkStaticContent() {
  try {
    console.log('🔍 Checking staticContent collection...\n');
    
    const snapshot = await db.collection('staticContent').get();
    
    if (snapshot.empty) {
      console.log('❌ No documents found in staticContent collection!');
      console.log('\n📝 You need to create content in your CRM admin panel:');
      console.log('   1. Go to your CRM admin panel');
      console.log('   2. Navigate to Static Content Management');
      console.log('   3. Create "Terms of Service" with type: terms_of_service');
      console.log('   4. Create "Privacy Policy" with type: privacy_policy');
      console.log('   5. Make sure to toggle "Published" to ON');
      return;
    }
    
    console.log(`✅ Found ${snapshot.size} document(s) in staticContent:\n`);
    
    snapshot.forEach(doc => {
      const data = doc.data();
      console.log(`📄 Document ID: ${doc.id}`);
      console.log(`   Type: ${data.type}`);
      console.log(`   Title: ${data.title}`);
      console.log(`   Published: ${data.isPublished ? '✅ YES' : '❌ NO (not visible in app!)'}`);
      console.log(`   Last Updated: ${data.lastUpdated?.toDate() || 'N/A'}`);
      console.log(`   Content Length: ${data.content?.length || 0} characters`);
      console.log(`   Updated By: ${data.updatedBy || 'N/A'}`);
      console.log('');
    });
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    process.exit(0);
  }
}

checkStaticContent();
