import UtilitiesProvider from '../Utilities/UtilitiesProvider'
import "../styles/Styles.scss"

function MyApp({ Component, pageProps }) {
  return <UtilitiesProvider Pages={<Component {...pageProps} />} />
}

export default MyApp
