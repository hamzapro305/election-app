import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
    apiKey: process.env.APP_API_KEY,
    authDomain: process.env.APP_AUTH_DOMAIN,
    projectId: process.env.APP_PROJECT_ID,
    storageBucket: process.env.APP_STORAGE_BUCKET,
    messagingSenderId: process.env.APP_MESSAGING_SENDER_ID,
    appId: process.env.APP_ID,
    measurementId: process.env.APP_MEASUREMENT_ID
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const storage = getStorage(app);

const db = getFirestore(app);

export { auth, db, storage };
