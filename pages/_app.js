import { SessionProvider } from 'next-auth/react'
import '../styles/globals.css'
import "antd/dist/antd.css";


// export default function App({ Component, pageProps }) {
//   return <Component {...pageProps} />
// }
export default function App({ Component, pageProps }) {
  // return <Component {...pageProps} />
  return <SessionProvider session={pageProps.session}>
     <Component {...pageProps} />
</SessionProvider>
}