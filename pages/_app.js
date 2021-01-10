import '../styles/globals.css';
import 'bootstrap/dist/css/bootstrap.min.css';
if(typeof window !== "undefined") require('bootstrap/dist/js/bootstrap.bundle');

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp
