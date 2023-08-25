const { gql } = require('apollo-server-express');

const typeDefs = gql`
type Profile {
    _id: ID
    name: String
    email: String
    password: String
  }

  type Auth {
    token: ID!
    profile: Profile
  }

  type Query {
    profiles: [Profile]!
    profile(profileId: ID!): Profile
  }

  type Mutation {
    createProfile(name: String!, email: String!, password: String!): Auth
    deleteProfile(profileId: ID!): Profile
    updateProfileName(id: ID!, newName: String!): Profile
    login(email: String!, password: String!): Auth
    
  }
`;

module.exports = typeDefs;
