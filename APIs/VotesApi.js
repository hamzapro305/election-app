import { db } from "Firebase/firebase";
import { collection, doc, onSnapshot, query, setDoc } from "firebase/firestore";

class VotesAPI {
    async sendVote(uid, CandidateID, email, voteTo) {
        const docRef = doc(db, "votes", uid);
        let data;
        if(voteTo == "male"){
            data = {
                from: uid,
                toMale: CandidateID,
                email,
            };
        }
        if(voteTo == "female"){
            data = {
                from: uid,
                toFemale: CandidateID,
                email,
            };
        }
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
