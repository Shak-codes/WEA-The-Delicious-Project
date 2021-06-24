const { ApolloServer } = require('apollo-server');
const { PORT = 3030 } = process.env;
const typeDefs = require('./typeDefs');
//const resolvers = require('./resolvers');
//const { getDataLoaders } = require('./loaders');

const server = new ApolloServer({ 
    typeDefs,
 });

server
    .listen(PORT)
    .then(({ url }) => console.log(`Serve is running at ${url}`));