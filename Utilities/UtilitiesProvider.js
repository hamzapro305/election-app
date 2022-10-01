import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import Loading from "../Components/Loading";
import AuthActions from "../Firebase/AuthActions";
import { setUserAction } from "../Redux/UserSlice";
import "react-toastify/dist/ReactToastify.css";
import HSToast from "../Components/HSToast";
import { useRouter } from "next/router";
import CandidateAPI from "APIs/CandidateAPI";
import { CandidateActions } from "Redux/CandidateSlice";

const UtilitiesProvider = ({ Pages }) => {
    const router = useRouter();
    const { header, footer } = useSelector((s) => s.GlobalVariables);
    const { User } = useSelector((s) => s.CurrentAuth);

    const dispatch = useDispatch();

    if (User === null && router.pathname !== "/Login") {
        router.push("/Login");
    }

    //User Management
    useEffect(() => {
        AuthActions.ProvideUser((user) => dispatch(setUserAction(user)));
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
