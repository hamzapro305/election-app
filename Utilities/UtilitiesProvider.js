import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import Loading from "../Components/Loading";
import AuthActions from "../Firebase/AuthActions";
import UserSlice, { userActions } from "../Redux/UserSlice";
import "react-toastify/dist/ReactToastify.css";
import HSToast from "../Components/HSToast";
import { useRouter } from "next/router";
import CandidateAPI from "APIs/CandidateAPI";
import { CandidateActions } from "Redux/CandidateSlice";
import VotesApi from "APIs/VotesApi";
import { VotesActions } from "Redux/VotesSlice";
import { GlobalVariableActions } from "Redux/GlobalVariableSlice";
import UserNotVerified from "Components/UserNotVerified";

const UtilitiesProvider = ({ Pages }) => {

    const router = useRouter();

    const { header, footer } = useSelector((s) => s.GlobalVariables);

    const { User, isEmailSubmitted } = useSelector((s) => s.CurrentAuth);

    const Votes = useSelector((s) => s.Votes.AllVotes);

    const RequiredEmails = useSelector((s) => s.Votes.RequiredEmails);


    const dispatch = useDispatch();

    if (User === null && router.pathname !== "/Login") {
        router.push("/Login");
    }

    // Email Verification
    useEffect(() => {
        if(User){
            const MY_EMAIL = User?.email?.toLowerCase()
            const result = RequiredEmails.filter(x => x.toLowerCase() === MY_EMAIL)
            if(result.length === 1) dispatch(userActions.setIsEmailSubmitted(true))
            else dispatch(userActions.setIsEmailSubmitted(false))
        }
    }, [User, RequiredEmails, dispatch])

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

    // Get GlobalVariables
    useEffect(() => {
        let Unsubscribe;
        AuthActions.getGlobalVariables((Data, uns) => {
            dispatch(
                GlobalVariableActions.setRealTime(Data)
            )
            Unsubscribe = uns
        })
        return () => {
            Unsubscribe && Unsubscribe();
        };
    }, [dispatch]);

    // Check For Vote Submission
    useEffect(() => {
        if (User) {
            const MyVote = Votes.filter(x => x.from === User.uid)[0]

            if(!!MyVote?.toMale) {
                dispatch(userActions.setIsMaleVoteSubmitted(true))
            }else dispatch(userActions.setIsMaleVoteSubmitted(false))
            if(!!MyVote?.toFemale) {
                dispatch(userActions.setIsFemaleVoteSubmitted(true))
            }else dispatch(userActions.setIsFemaleVoteSubmitted(false))
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

    if(isEmailSubmitted === false){
        console.log(isEmailSubmitted)
        return <UserNotVerified />
    }

    if (User === false || isEmailSubmitted === null) {
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