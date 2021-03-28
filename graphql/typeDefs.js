const { gql } = require("apollo-server");

module.exports = gql`

type Post {
  id: ID!
  body: String!
  username: String!
  createdAt: String!
}

type User {
    id: ID!
    username: String!
    email: String!
    token: String!
    createdAt: String!
}

type Query {
  getPosts: [Post]
}

input RegisterInput {
    username: String!
    email: String!
    password: String!
}

type Mutation {
    register(registerInput: RegisterInput) : User
    login(email: String!, password: String! ) : User
}
`;
