import '@/styles/globals.css'
import '@/styles/bootstrap.css'
import { client } from '@/lib/graphql'
import { Provider } from '@/lib/context'
import { SSRProvider } from 'react-bootstrap'
import { ApolloProvider } from '@apollo/client'

const MyApp = ({ Component, pageProps }) => {
  return (
    <ApolloProvider client={client}>
      <SSRProvider>
        <Provider>
          <Component {...pageProps} />
        </Provider>
      </SSRProvider>
    </ApolloProvider>
  )
}

export default MyApp
