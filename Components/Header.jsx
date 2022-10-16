import Image from "next/future/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { HoverTapAnimation } from "../Utilities/Animations";
import { AiOutlineAlignRight } from "react-icons/ai";
import { Routes } from "../Data/Routes";
import { SidebarAnimations } from "../Data/Animations";
import { useDispatch, useSelector } from "react-redux";
import AuthActions from "Firebase/AuthActions";
import { GlobalVariableActions } from "Redux/GlobalVariableSlice";

const Header = () => {

    const { HamSideBar } = useSelector((s) => s.GlobalVariables);

    const { User } = useSelector((s) => s.CurrentAuth);

    const dispatch = useDispatch();

    const setSideBar = (callback) => dispatch(GlobalVariableActions.setHamSideBar(callback(HamSideBar)))

    const Logout = () => {
        AuthActions.SignOutUser()
        if(HamSideBar) setSideBar(x => false)
    }
    
    return (
        <motion.header>
            <div className="header-wrapper">
                <div className="logo-part">UBIT</div>
                <nav>
                    <ul>
                        {Routes(!!User).map((route) => {
                            return (
                                <Link href={route.path} key={route.path}>
                                    <motion.li
                                        {...HoverTapAnimation}
                                        className="route"
                                    >
                                        {route.name}
                                    </motion.li>
                                </Link>
                            );
                        })}
                        {User && <motion.li onClick={Logout} {...HoverTapAnimation}className="route" >
                            Logout
                        </motion.li>}
                        {User && (
                            <div className="User">
                                <div className="name">{User.displayName}</div>
                                <div
                                    className="photo"
                                    style={{ position: "relative" }}
                                >
                                    <Image sizes="50px" src={User.photoURL} alt="" fill />
                                </div>
                            </div>
                        )}
                    </ul>
                </nav>
                <button
                    className="ham"
                    onClick={() => {
                        setSideBar((x) => !x);
                    }}
                >
                    <AiOutlineAlignRight color="white" fontSize={28} />
                </button>
            </div>
            <motion.div
                className="sideBar"
                animate={{
                    width: HamSideBar ? "100%" : 0,
                    transition: {
                        type: "tween",
                        duration: 0.4,
                        damping: 10,
                    },
                }}
            >
                <AnimatePresence>
                    {HamSideBar && (
                        <motion.div
                            {...SidebarAnimations}
                            className="sideBar-wrapper"
                        >
                            <div className="head">
                                <div className="logo">Logo</div>
                                <button
                                    className="ham"
                                    onClick={() => {
                                        setSideBar((x) => !x);
                                    }}
                                >
                                    <AiOutlineAlignRight
                                        color="black"
                                        fontSize={28}
                                    />
                                </button>
                            </div>
                            <div className="body">
                                <nav>
                                    <ul>
                                        {Routes(!!User).map((route) => {
                                            return (
                                                <div
                                                    key={route.path}
                                                    onClick={() => {
                                                        setSideBar((x) => !x);
                                                    }}
                                                >
                                                    <Link href={route.path}>
                                                        <motion.li
                                                            {...HoverTapAnimation}
                                                            className="route"
                                                        >
                                                            {route.name}
                                                        </motion.li>
                                                    </Link>
                                                </div>
                                            );
                                        })}
                                        {User && <motion.li onClick={Logout} {...HoverTapAnimation}className="route" >
                                            Logout
                                        </motion.li>}
                                    </ul>
                                </nav>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </motion.header>
    );
};

export default Header;
