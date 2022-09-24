import { nanoid } from "@reduxjs/toolkit";
import { db, storage } from "Firebase/firebase";
import { doc, setDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

class CandidateAPI {
    async UploadCandidate(uid, data) {
        console.log(uid)
        return new Promise(async (res, rej) => {
            const docRef = doc(db, "CandidateRequests", uid);
            try {
                
                const image = await this.UploadCandidateImage(data.image)

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