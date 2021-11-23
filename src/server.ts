import { ApolloServer } from 'apollo-server'
import { schema } from './schema'
import { context } from './context'
import { resolvers } from './resolvers'

const server = new ApolloServer({
  typeDefs: schema,
  resolvers: resolvers,
  context: context,
})

server.listen().then(async ({ url }) => {
  console.log(`\
🚀 Server ready at: ${url}
⭐️ See sample queries: http://pris.ly/e/ts/graphql#using-the-graphql-api
  `)
})
