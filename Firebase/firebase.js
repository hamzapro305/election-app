import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_APP_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_APP_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_APP_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_APP_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_APP_MEASUREMENT_ID,
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const storage = getStorage(app);

const db = getFirestore(app);

export { auth, db, storage };
