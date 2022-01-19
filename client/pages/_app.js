import '@/styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { SSRProvider } from 'react-bootstrap'
import { ApolloProvider } from '@apollo/client'
import { client } from '@/lib/graphql'

const MyApp = ({ Component, pageProps }) => {
  return (
    <ApolloProvider client={client}>
      <SSRProvider>
        <Component {...pageProps} />
      </SSRProvider>
    </ApolloProvider>
  )
}

export default MyApp
