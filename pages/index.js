import Head from "next/head";
import FadePageWrapper from "../Components/FadePageWrapper";
import { GlobalMainButton } from "../Components/GlobalButtons";
import { ErrorToast } from "../Components/HSToast";
import AuthActions from "../Firebase/AuthActions";

const Home = () => {
    const SignIn = () => {
        try {
            AuthActions.signInWithGoogle();
        } catch (error) {
            ErrorToast(error);
        }
    };
    const show = () => {
        ErrorToast("Some Error occurred");
    };
    return (
        <FadePageWrapper>
            <div className="Home">
                <Head>
                    <title>Home</title>
                </Head>
                <GlobalMainButton
                    onClick={SignIn}
                    Content="Sign in With Google"
                />
                <GlobalMainButton onClick={show} Content="check" />
            </div>
        </FadePageWrapper>
    );
};

export default Home;
