import Image from "next/image";
import Link from "next/link";
import Logo from "../Assets/Logo.png"
import { motion } from "framer-motion";
import { HoverTapAnimation, PageAnimation } from "../Utilities/Animations";

const Header = () => {
    return (
        <motion.header {...PageAnimation}>
            <div className="header-wrapper">
                <div className="logo-part">
                  <Image width={30} height={30} src={Logo} objectFit="cover" />
                </div>
                <nav>
                    <ul>
                        {Routes.map((route) => {
                            return (
                                <Link href={route.path} key={route.path}>
                                    <motion.li {...HoverTapAnimation}
                                    className="route"> {route.name} </motion.li>
                                </Link>
                            );
                        })}
                    </ul>
                </nav>
            </div>
        </motion.header>
    );
};

export default Header;

const Routes = [
    {
        name: "Home",
        path: "/",
    },
    {
        name: "About",
        path: "/About",
    },
    {
        name: "Vote Now",
        path: "/Vote",
    },
    {
        name: "Candidates",
        path: "/Candidates",
    },
];
