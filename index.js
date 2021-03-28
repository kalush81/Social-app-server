require("dotenv").config();
const { ApolloServer, gql } = require("apollo-server");
const mongoose = require("mongoose");

const dbUri = process.env.MONGO_DB_URI;

const typeDefs = require('./graphql/typeDefs')
const resolvers = require('./graphql/resolvers')

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

mongoose
  .connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    return server.listen({ port: 5000 });
  })
  .then(() => {
    console.log("server running and db conected");
  })
  .catch((err) => console.error("something went wrong while connecting", err));
