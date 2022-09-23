import UtilitiesProvider from "../Utilities/UtilitiesProvider";
import "../styles/Styles.scss";
import { Wrapper } from "../Redux/store";
import NextNProgress from "nextjs-progressbar";

const MyApp = ({ Component, pageProps }) => {
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
            <UtilitiesProvider Pages={<Component {...pageProps} />} />
        </>
    );
};

export default Wrapper.withRedux(MyApp);
