import Image from "next/image";
import Link from "next/link";
import Logo from "../Assets/Logo.png"
import { AnimatePresence, motion } from "framer-motion";
import { HoverTapAnimation, PageAnimation } from "../Utilities/Animations";
import { useState } from "react";
import { AiOutlineAlignRight } from "react-icons/ai"
import { SimpleRoutes } from "../Data/Routes";
import { SidebarAnimations } from "../Data/Animations";
import { useDispatch, useSelector } from "react-redux";
import { setHamSideBar } from "../Redux/GlobalVariableSlice";

const Header = () => {
    const { HamSideBar } = useSelector(s => s.GlobalVariables)
    const dispatch = useDispatch()
    const setSideBar = (callback) => {
        dispatch(setHamSideBar(
            callback(HamSideBar)
        ))
    }
    return (
        <motion.header {...PageAnimation}>
            <div className="header-wrapper">
                <div className="logo-part">
                    <Image width={30} height={30} src={Logo} objectFit="cover" />
                </div>
                <nav>
                    <ul>
                        {SimpleRoutes.map((route) => {
                            return (
                                <Link href={route.path} key={route.path}>
                                    <motion.li
                                        {...HoverTapAnimation}
                                        className="route" >
                                        {route.name}
                                    </motion.li>
                                </Link>
                            );
                        })}
                    </ul>
                </nav>
                <button className="ham" onClick={() => {
                    setSideBar(x => !x)
                }}>
                    <AiOutlineAlignRight color="white" fontSize={28}/>
                </button>
            </div>
            <motion.div className="sideBar"
                animate={{
                    width: HamSideBar ? "100%" : 0,
                    transition: {
                        type: "tween",
                        duration: .4,
                        damping: 10,
                    }
                }}
            >
                <AnimatePresence>
                {HamSideBar && <motion.div {...SidebarAnimations} className="sideBar-wrapper">
                    <div className="head">
                        <div className="logo">Logo</div>
                        <button className="ham" onClick={() => {
                            setSideBar(x => !x)
                        }}>
                            <AiOutlineAlignRight color="black" fontSize={28}/>
                        </button>
                    </div>
                    <div className="body">
                        <nav>
                            <ul>
                                {SimpleRoutes.map((route) => {
                                    return (
                                        <div key={route.path} onClick={() => {
                                            setSideBar(x => !x)
                                        }}>
                                            <Link href={route.path} >
                                                <motion.li
                                                    {...HoverTapAnimation}
                                                    className="route" >
                                                    {route.name}
                                                </motion.li>
                                            </Link>
                                        </div>
                                    );
                                })}
                            </ul>
                        </nav>
                    </div>
                </motion.div>}
                </AnimatePresence>

            </motion.div>
        </motion.header>
    );
};

export default Header;

