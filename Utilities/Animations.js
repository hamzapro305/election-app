const FadeAnimationVariants = {
    enter: {
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
    exit: {
        opacity: 0,
        transition: {
            duration: 0.5,
        },
    },
};

const HoverTapAnimation = {
    whileHover: { scale: 1.1 },
    whileTap: { scale: 0.9 },
    transition: {
        duration: 0.1,
        type: "Spring",
        damping: 11,
        stiffness: 500,
    },
};

const PageAnimation = {
    variants: FadeAnimationVariants,
    initial: "enter",
    animate: "show",
    exit: "exit",
};

export { PageAnimation, HoverTapAnimation };
