import Image from "next/future/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { HoverTapAnimation, PageAnimation } from "../Utilities/Animations";
import { AiOutlineAlignRight } from "react-icons/ai";
import { SimpleRoutes } from "../Data/Routes";
import { SidebarAnimations } from "../Data/Animations";
import { useDispatch, useSelector } from "react-redux";
import { setHamSideBar } from "../Redux/GlobalVariableSlice";

const Header = () => {

    const { HamSideBar } = useSelector((s) => s.GlobalVariables);

    const { User } = useSelector((s) => s.CurrentAuth);

    const dispatch = useDispatch();

    const setSideBar = (callback) => dispatch(setHamSideBar(callback(HamSideBar)))
    
    return (
        <motion.header>
            <div className="header-wrapper">
                <div className="logo-part">UBIT</div>
                <nav>
                    <ul>
                        {SimpleRoutes.map((route) => {
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
                                        {SimpleRoutes.map((route) => {
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
