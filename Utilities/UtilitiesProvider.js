import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import Loading from "../Components/Loading";
import AuthActions from "../Firebase/AuthActions";
import { userActions } from "../Redux/UserSlice";
import "react-toastify/dist/ReactToastify.css";
import HSToast from "../Components/HSToast";
import { useRouter } from "next/router";
import CandidateAPI from "APIs/CandidateAPI";
import { CandidateActions } from "Redux/CandidateSlice";
import VotesApi from "APIs/VotesApi";
import { VotesActions } from "Redux/VotesSlice";

const UtilitiesProvider = ({ Pages }) => {
    const router = useRouter();
    const { header, footer } = useSelector((s) => s.GlobalVariables);
    const { User } = useSelector((s) => s.CurrentAuth);
    const Votes = useSelector((s) => s.Votes.AllVotes);

    const dispatch = useDispatch();

    if (User === null && router.pathname !== "/Login") {
        router.push("/Login");
    }

    //User Management
    useEffect(() => {
        AuthActions.ProvideUser((user) => dispatch(userActions.setUserAction(user)));
    }, [dispatch]);

    //Get Candidates Data
    useEffect(() => {
        let Unsubscribe;
        CandidateAPI.getLiveCandidates((data, uns) => {
            dispatch(CandidateActions.setCandidates(data));
            Unsubscribe = uns;
        });
        return () => {
            Unsubscribe && Unsubscribe();
        };
    }, [dispatch]);

    // Check For Vote Submission
    useEffect(() => {
        if (User) {
            let check = false;
            for (let i = 0; i < Votes.length; i++) {
                if(Votes[i].email === User.email){
                    check = true;
                    break
                }
            }
            dispatch(
                userActions.setIsVoteSubmitted(check)
            )
        }
    }, [User, Votes, dispatch]);

    // Votes
    useEffect(() => {
        let Unsubscribe;
        VotesApi.getVotes((data, uns) => {
            dispatch(VotesActions.setVotes(data));
            Unsubscribe = uns;
        });
        return () => {
            Unsubscribe && Unsubscribe();
        };
    }, [dispatch]);

    if (User === false) {
        return <Loading />;
    }

    return (
        <>
            {header && <Header />}
            {Pages}
            {footer && <Footer />}
            <HSToast />
        </>
    );
};

export default UtilitiesProvider;
