const SideBarVariants = {
  hidden: {
    opacity: 0,
    transition: {
      duration: 0.1,
    },
  },
  show: {
    opacity: 1,
    transition: {
      delay: 0.5,
    },
  },
};
const SidebarAnimations = {
  variants: SideBarVariants,
  initial: "hidden",
  animate: "show",
  exit: "hidden",
};
export { SidebarAnimations };
