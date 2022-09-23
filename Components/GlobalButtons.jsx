import Image from "next/image";
import { motion } from "framer-motion";
import { WarnToast } from "./HSToast";
import { BUTTON_BUFFER } from "../Assets";

const GlobalMainButton = ({
    disabled,
    onClick,
    Content,
    cssClass,
    isLoading,
}) => (
    <motion.button 
        whileTap={{scale: .9}}
        whileHover={{scale: 1.04}}
        disabled={disabled === true ? true : false}
        className={`GlobalMainButton ${cssClass ? cssClass : ""}`}
        onClick={() => {
            if (isLoading) {
                WarnToast("Please Wait")
                return;
            }
        
            onClick ? onClick() : ""
        }}
    >
        {isLoading ? <Image src={BUTTON_BUFFER} width="80" height="20" objectFit="cover" alt="Loading..."/> : Content}
    </motion.button>
);

const GlobalDarkButton = ({ disabled, onClick, Content, cssClass, isLoading }) => (
    <motion.button
        whileTap={{scale: .9}}
        whileHover={{scale: 1.04}}
        disabled={disabled === true ? true : false}
        className={`GlobalDarkButton ${cssClass ? cssClass : ""}`}
        onClick={() => {
            if (isLoading) {
                WarnToast("Please Wait")
                return;
            }
            onClick ? onClick() : ""
        }}
    >
        {isLoading ? <Image src={BUTTON_BUFFER} width="80" height="20" objectFit="cover" alt="Loading..." /> : Content}
    </motion.button>
);

const GlobalLightButton = ({ disabled, onClick, Content, cssClass, isLoading, REF }) => (
    <motion.button
        whileTap={{scale: .9}}
        whileHover={{scale: 1.04}}
        ref={REF}
        disabled={disabled === true ? true : false}
        className={`GlobalLightButton ${cssClass ? cssClass : ""}`}
        onClick={() => {
            if (isLoading) {
                WarnToast("Please Wait")
                return;
            }
            onClick ? onClick() : ""
        }}
    >
        <p>
        {isLoading ? <Image src={BUTTON_BUFFER} width="80" height="20" objectFit="cover" alt="Loading..." /> : Content}
        </p>
    </motion.button>
);

const GlobalCheckBox = ({ dependsOn, onClick, isLoading }) => (
    <div
        className="GlobalCheckBox"
        onClick={() => {
            if (isLoading) return;
            onClick();
        }}
        style={{
            justifyContent: dependsOn ? "flex-end" : "flex-start",
            cursor: isLoading ? "progress" : "pointer",
        }}
    >
        <div className={`ball ${dependsOn ? "on" : ""}`}></div>
    </div>
);

export {
    GlobalMainButton,
    GlobalDarkButton,
    GlobalLightButton,
    GlobalCheckBox,
};