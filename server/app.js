const fs = require('fs')
const http = require('http')
const express = require('express')
const {
	ApolloServerPluginDrainHttpServer,
	ApolloServerPluginLandingPageGraphQLPlayground,
} = require('apollo-server-core')
const { ApolloServer, gql } = require('apollo-server-express')

require('dotenv').config()

async function startApolloServer() {
	const app = express()
	const httpServer = http.createServer(app)

	const server = new ApolloServer({
		typeDefs: gql`
			${fs.readFileSync('./graphql/schema.gql')}
		`,
		resolvers: {
			...require('./graphql/types'),
			Query: require('./graphql/queries'),
			Mutation: require('./graphql/mutations'),
		},
		playground: true,
		plugins: [
			ApolloServerPluginLandingPageGraphQLPlayground,
			ApolloServerPluginDrainHttpServer({ httpServer }),
		],
	})

	await server.start()
	server.applyMiddleware({ app, path: '/' })

	await new Promise((resolve) => httpServer.listen({ port: 8000 }, resolve))
	console.log(`🚀 Server ready at http://localhost:8000${server.graphqlPath}`)
}

startApolloServer()
