const { gql } = require('apollo-server-express');

const typeDefs = gql`
type User {
    _id: ID
    name: String
    email: String
    password: String
  }

type Color {
    _id: ID!
    createdAt: String!
    hexCode: String!
    references: String
  }

type Auth {
    token: ID!
    User: User
  }

type Query {
    Users: [User]!
    User(UserId: ID!): User
    Colors: [Color]!
    Color(id: ID!): Color
    Gradients: [Color]!
    Gradient(id: ID!): Color
  }

type Mutation {
    createUser(name: String!, email: String!, password: String!): Auth
    deleteUser(UserId: ID!): User
    updateUserName(id: ID!, newName: String!): User
    login(email: String!, password: String!): Auth
    createColor(hexCode: String!): Color
    deleteColor(id: ID!): Color
    updateColor(id: ID!, hexCode: String!): Color
  }
`;

module.exports = typeDefs;
