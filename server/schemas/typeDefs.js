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
    name: String
    userId: ID
    references: String
  }

type Gradient {
    _id: ID!
    gradientName: String!
    color: String!
    createdAt: String!
  }

type Font {
    _id: ID!
    activeFontFamily: String!
  }

type Palette {
    _id: ID!
    paletteName: String!
    createdAt: String!
    color1: String!
    color2: String!
    color3: String!
    color4: String!
    color5: String!
    colors: [String!]!
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
    Gradients: [Gradient]!
    Gradient(id: ID!): Gradient
    Fonts: [Font]!
    Font(id: ID!): Font
    Palettes: [Palette]!
    Palette(id: ID!): Palette
  }

type Mutation {
    createUser(name: String!, email: String!, password: String!): Auth
    deleteUser(UserId: ID!): User
    updateUserName(id: ID!, newName: String!): User
    login(email: String!, password: String!): Auth

    createColor(hexCode: String!, name: String!, userId: ID!): Color
    deleteColor(id: ID!): Color
    updateColor(id: ID!, hexCode: String!, name: String): Color

    createGradient(gradientName: String!, color: String!): Gradient!
    updateGradient(id: ID!, gradientName: String!, color: String!): Gradient!
    deleteGradient(id: ID!): Gradient!

    createFont(activeFontFamily: String!): Font
    deleteFont(id: ID!): Font
    updateFont(id: ID!, activeFontFamily: String!): Font

    createPalette(
      paletteName: String!
      color1: String!
      color2: String!
      color3: String!
      color4: String!
      color5: String!
    ): Palette
    updatePalette(
      id: ID!
      paletteName: String
      color1: String
      color2: String
      color3: String
      color4: String
      color5: String
    ): Palette
    deletePalette(id: ID!): Palette
  }
`;

module.exports = typeDefs;
