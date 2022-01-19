import '@/styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { SSRProvider } from 'react-bootstrap'

const MyApp = ({ Component, pageProps }) => {
  return (
    <SSRProvider>
      <Component {...pageProps} />
    </SSRProvider>
  )
}

export default MyApp
