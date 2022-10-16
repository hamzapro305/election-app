import {
    GoogleAuthProvider,
    onAuthStateChanged,
    signInWithPopup,
    signOut,
} from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";
import { auth, db } from "./firebase";

class AuthActions {
    async signInWithGoogle() {
        return new Promise(async (res, rej) => {
            try {
                const googleProvider = new GoogleAuthProvider();
                const USER = await signInWithPopup(auth, googleProvider);
                res(true);
            } catch (err) {
                switch (err.code) {
                    case "auth/popup-closed-by-user":
                        rej("Process Canceled");
                        break;
                    case "auth/unauthorized-domain":
                        rej("Domain is Un-Authorized/Verified");
                        break;
                    case "auth/internal-error":
                        rej("Internal Error");
                        break;
                    default:
                        rej(err);
                        break;
                }
            }
        });
    }

    getGlobalVariables(callBack) {
        const docRef = doc(db, "GlobalVariables", "vars");
        const unSubscribe = onSnapshot(docRef, (doc) => {
            callBack(doc.data(), unSubscribe);
        });
    }

    async SignOutUser() {
        try {
            const res = await signOut(auth);
            return res;
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    ProvideUser(callBack) {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                callBack(user);
            } else {
                callBack(null);
            }
        });
    }
}

export default new AuthActions();
