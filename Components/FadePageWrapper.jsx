import { motion } from "framer-motion";

const FadePageWrapper = ({ children }) => {
    return (
        <motion.div
            variants={Variants}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="_fade_in_fade_out_page_wrapper_"
        >
            {children}
        </motion.div>
    );
};

const Variants = {
    hidden: {
        opacity: 0,
        transition: {
            duration: 0.5,
        },
    },
    show: {
        opacity: 1,
        transition: {
            duration: 0.5,
        },
    },
};

export default FadePageWrapper;
