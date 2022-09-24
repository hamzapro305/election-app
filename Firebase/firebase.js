import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyBHa_vgfIwX1OKIJqXvYYrfHOWWhrDx9aM",

    authDomain: "election-app-e9fcc.firebaseapp.com",

    projectId: "election-app-e9fcc",

    storageBucket: "election-app-e9fcc.appspot.com",

    messagingSenderId: "908230620192",

    appId: "1:908230620192:web:265eff42a9731da1017845",

    measurementId: "G-5JPQ4WJZSJ",
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const storage = getStorage(app);

const db = getFirestore(app);

export { auth, db, storage };
