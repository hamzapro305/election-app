import UtilitiesProvider from "../Utilities/UtilitiesProvider";
import { Wrapper } from "../Redux/store";
import NextNProgress from "nextjs-progressbar";
import { AnimatePresence } from "framer-motion";
import "styles/Styles.scss";

const MyApp = ({ Component, pageProps, router }) => {
    return (
        <>
            <NextNProgress
                color="white"
                startPosition={0.3}
                height={3}
                options={{
                    showSpinner: false,
                }}
            />
            <UtilitiesProvider
                Pages={
                    <AnimatePresence
                        mode="wait"
                        onExitComplete={() => window.scrollTo(0, 0)}
                    >
                        <Component {...pageProps} key={router.route} />
                    </AnimatePresence>
                }
            />
        </>
    );
};

export default Wrapper.withRedux(MyApp);
