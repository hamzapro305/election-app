import { db } from "Firebase/firebase";
import { collection, doc, onSnapshot, query, setDoc } from "firebase/firestore";

class VotesAPI {
    async sendVote(uid, CandidateID, email) {
        const docRef = doc(db, "votes", uid);
        const data = {
            from: uid,
            to: CandidateID,
            email,
        };
        await setDoc(docRef, data, { merge: true });
    }
    getVotes(callBack) {
        const colRef = collection(db, "votes")
        const q = query(colRef)
        const Unsubscribe = onSnapshot
        (q, (data) => {
            callBack(
                data.docs.map(x => ({...x.data(), id: x.id})),
                Unsubscribe
            )
        })
    }
}

export default new VotesAPI();
