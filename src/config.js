import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
    apiKey: "AIzaSyA0cHV-FxFGPxV7hb-4iN33SooB0RW6wxM",
    authDomain: "trcklst-79a8c.firebaseapp.com",
    projectId: "trcklst-79a8c",
    storageBucket: "trcklst-79a8c.firebasestorage.app",
    messagingSenderId: "852310170891",
    appId: "1:852310170891:web:9cec117e494ecaa673960e"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const analytics = getAnalytics(app);

export default app;