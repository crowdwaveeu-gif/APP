// Firebase configuration and initialization
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getAnalytics } from 'firebase/analytics';
import { getFunctions } from 'firebase/functions';

// Firebase configuration - using the same project as the Flutter app
const firebaseConfig = {
  apiKey: 'AIzaSyAhMBkRD49SMgrYfKSiXz6RvkXQ4An67ak',
  appId: '1:351442774180:web:532be8a350d61cde5f9e31',
  messagingSenderId: '351442774180',
  projectId: 'crowdwave-93d4d',
  authDomain: 'crowdwave-93d4d.firebaseapp.com',
  storageBucket: 'crowdwave-93d4d.firebasestorage.app',
  measurementId: 'G-GZ6BHCQFY2',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const db = getFirestore(app);
export const auth = getAuth(app);
export const analytics = getAnalytics(app);
export const functions = getFunctions(app);

export default app;