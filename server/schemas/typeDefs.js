const { gql } = require('apollo-server-express');

const typeDefs = gql`
type User {
    _id: ID
    name: String
    email: String
    password: String
  }

  type Auth {
    token: ID!
    User: User
  }

  type Query {
    Users: [User]!
    User(UserId: ID!): User
  }

  type Mutation {
    createUser(name: String!, email: String!, password: String!): Auth
    deleteUser(UserId: ID!): User
    updateUserName(id: ID!, newName: String!): User
    login(email: String!, password: String!): Auth
    
  }
`;

module.exports = typeDefs;
