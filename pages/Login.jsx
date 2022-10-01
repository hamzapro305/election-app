import { GlobalLightButton } from "Components/GlobalButtons";
import AuthActions from "Firebase/AuthActions";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { useRouter } from "next/router";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { useSelector } from "react-redux";
const Login = () => {

    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const { User } = useSelector((s) => s.CurrentAuth);

    const router = useRouter()


    if(User !== null && router.pathname === "/Login") {
        router.push("/")
    }

    const SignIn = () => {
        setIsLoading(true)
        try {
            AuthActions.signInWithGoogle();
        } catch (error) {
            ErrorToast(error);
        }
        setIsLoading(false)
    };
    return (
        <LayoutGroup>
            <motion.div layout className="Login">
                <motion.div
                    className={`login-setup ${isOpen ? "active" : ""}`}
                    onClick={() => setIsOpen(true)}
                    onMouseLeave={() => setIsOpen(false)}
                    layout
                    transition={{ layout: { duration: 1, type: "spring" } }}
                >
                    <motion.div layout="position" className="Button">
                        <FcGoogle />
                        <p>Sign In With Google</p>
                    </motion.div>
                    <AnimatePresence mode="wait">
                        {isOpen && (
                            <motion.div {...innerBox} className="content-body">
                                <div className="content">
                                    <div className="heading">Warning..</div>
                                    <p>
                                        Please Login With Submitted Gmail in
                                        Class
                                    </p>
                                    <p>OtherWise Your Vote Will Not Be Count</p>
                                    <GlobalLightButton
                                        Content="Sign In"
                                        onClick={SignIn}
                                        isLoading={isLoading}
                                    />
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            </motion.div>
        </LayoutGroup>
    );
};

const innerBox = {
    variants: {
        initial: {
            opacity: 0,
            paddingTop: "20px",
        },
        animate: {
            opacity: 1,
        },
    },
    initial: "initial",
    animate: "animate",
    exit: "initial",
    transition: {
        delay: 0.2,
    },
    layout: true,
};

export default Login;
