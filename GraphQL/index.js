const { ApolloServer } = require('apollo-server');
const { PORT = 3030 } = process.env;
const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');

const server = new ApolloServer({
    typeDefs,
    resolvers
});

server
    .listen({port: process.env.PORT || 3030 })
    .then(({ url }) => console.log(`Server is running at ${url}`));