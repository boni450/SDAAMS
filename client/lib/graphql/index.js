import { ApolloClient, InMemoryCache } from '@apollo/client'

export const client = new ApolloClient({
	uri: process.env.api,
	cache: new InMemoryCache(),
})
