import NextNProgress from "nextjs-progressbar";
import Footer from "../Components/Footer";
import Header from "../Components/Header";

const UtilitiesProvider = ({ Pages }) => {
    return (
        <>
            <NextNProgress
                color="white"
                startPosition={0.3}
                stopDelayMs={900}
                height={3}
                showOnShallow={true}
                options={{
                    showSpinner: false,
                }}
            />
            <Header />
            {Pages}
            <Footer />
        </>
    );
};

export default UtilitiesProvider;
