import UtilitiesProvider from "../Utilities/UtilitiesProvider";
import { Wrapper } from "../Redux/store";
import NextNProgress from "nextjs-progressbar";
import { Provider } from "react-redux";
import { AnimatePresence } from "framer-motion";
import "styles/Styles.scss";
import { useRouter } from "next/router";

const MyApp = ({ Component, ...rest }) => {
    const { store, props } = Wrapper.useWrappedStore(rest);
    const router = useRouter();
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
            <Provider store={store}>
                <UtilitiesProvider
                    Pages={
                        <AnimatePresence
                            mode="wait"
                            onExitComplete={() => window.scrollTo(0, 0)}
                        >
                            <Component
                                {...props.pageProps}
                                key={router.route}
                            />
                        </AnimatePresence>
                    }
                />
            </Provider>
        </>
    );
};

export default MyApp;
