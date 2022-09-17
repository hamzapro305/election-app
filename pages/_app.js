import UtilitiesProvider from "../Utilities/UtilitiesProvider";
import "../styles/Styles.scss";
import { Wrapper } from "../Redux/store";

function MyApp({ Component, pageProps }) {
  return <UtilitiesProvider Pages={<Component {...pageProps} />} />;
}

export default Wrapper.withRedux(MyApp);
