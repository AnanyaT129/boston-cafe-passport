const {typeDefs} = require("./src/graphql/typeDefs")
const {resolvers} = require("./src/graphql/resolvers")
const {ApolloServer} = require("apollo-server")

const server = new ApolloServer({ typeDefs, resolvers });
server.listen({ port: process.env.PORT || 4000, host: '0.0.0.0' }).then(({ url }) => {
  console.log(`App is running At : ${url}`);
});