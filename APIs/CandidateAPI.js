import { nanoid } from "@reduxjs/toolkit";
import { db, storage } from "Firebase/firebase";
import { collection, doc, getDoc, onSnapshot, query, setDoc, where } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

class CandidateAPI {
    async getCandidateFormData(uid){
        try {
            const docRef = doc(db, "CandidateRequests", uid);
            const Data = await getDoc(docRef)
            if(Data.exists()){
                return Data.data()
            }else{
                return null;
            }
        } catch (err) {
            console.log(err)
            return null;
        }
    }
    UploadCandidate(uid, data) {
        return new Promise(async (res, rej) => {
            const docRef = doc(db, "CandidateRequests", uid);
            try {
                let image;
                if(typeof data.image !== "string"){
                    if(data.image){
                        image = await this.UploadCandidateImage(data.image)
                    }else{
                        image = ""
                    }
                }else{
                    image = data.image
                }

                const upload = {
                    ...data,
                    image: image,
                };
                await setDoc(docRef, upload, { merge: true });
                
                res(true);
            } catch (error) {
                console.log(error);
                rej(false);
            }
        });
    }

    async getLiveCandidates(callBack){
        const colRef = collection(db, "CandidateRequests")
        const q = query(colRef, where("status", "==", "accepted"))
        const Unsubscribe = onSnapshot(q, (data) => {
            callBack(
                data.docs.map(x => ({...x.data(), id: x.id})),
                Unsubscribe
            )
        })
    }

    async UploadCandidateImage(file) {
        return new Promise((res, rej) => {
            try {
                const storageRef = ref(
                    storage,
                    `files/Candidates/image/${nanoid()}${file.name}`
                );
                const uploadTask = uploadBytesResumable(storageRef, file);
                uploadTask.on(
                    "state_changed",
                    (snapshot) => {
                        // const progress = Math.round(
                        //   (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                        // );
                    },
                    (error) => {
                        alert(error);
                    },
                    () => {
                        getDownloadURL(uploadTask.snapshot.ref).then(
                            (downloadURL) => {
                                res(downloadURL);
                            }
                        );
                    }
                );
            } catch (err) {
                rej(err);
            }
        });
    }
}
export default new CandidateAPI();
