import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import Loading from "../Components/Loading";
import AuthActions from "../Firebase/AuthActions";
import { setUserAction } from "../Redux/UserSlice";
import "react-toastify/dist/ReactToastify.css";
import HSToast from "../Components/HSToast";
import { AnimatePresence } from "framer-motion";

const UtilitiesProvider = ({ Pages }) => {
    const { header, footer } = useSelector((s) => s.GlobalVariables);
    const { User } = useSelector((s) => s.CurrentAuth);
    const dispatch = useDispatch();

    //RouteManagement
    useEffect(() => {}, []);

    //User Management
    useEffect(() => {
        AuthActions.ProvideUser((user) => {
            dispatch(setUserAction(user));
        });
    }, [dispatch]);

    if (User === false) {
        return <Loading />;
    }

    return (
        <>
            {header && <Header />}
            <AnimatePresence
                mode="wait"
                presenceAffectsLayout
                onExitComplete={() => window.scrollTo(0, 0)}
            >
                {Pages}
            </AnimatePresence>
            {footer && <Footer />}
            <HSToast />
        </>
    );
};

export default UtilitiesProvider;
