import '../styles/globals.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'next-auth/client';
if(typeof window !== "undefined") require('bootstrap/dist/js/bootstrap.bundle');

function MyApp({ Component, pageProps }) {
  return (
    <Provider session={pageProps.session}>
      <Component {...pageProps} />
    </Provider>
  )
}

export default MyApp
