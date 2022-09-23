import { motion } from "framer-motion";

const FadePageWrapper = ({ children }) => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 5 }}
            className="_fade_in_fade_out_page_wrapper_"
        >
            {children}
        </motion.div>
    );
};

export default FadePageWrapper;
