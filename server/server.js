const {typeDefs} = require("./src/graphql/typeDefs")
const {resolvers} = require("./src/graphql/resolvers")
const {ApolloServer} = require("apollo-server")
const admin = require("firebase-admin");

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const authHeader = req.headers.authorization || '';
    const token = authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;

    if (token) {
      try {
        const decodedToken = await admin.auth().verifyIdToken(token);
        return { uid: decodedToken.uid, email: decodedToken.email };
      } catch (error) {
        console.error('Invalid Firebase ID token:', error.message);
        throw new Error('Unauthorized');
      }
    }

    return {}; // no user
  }
});

server.listen({ port: process.env.PORT || 4000, host: '0.0.0.0' }).then(({ url }) => {
console.log(`App is running At : ${url}`);
});