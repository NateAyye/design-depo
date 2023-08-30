import { gql } from '@apollo/client';

export const QUERY_SINGLE_COLOR = gql`
query Query($colorId: ID!) {
    Color(id: $colorId) {
      name
    }
  }
`;

export const QUERY_ALL_COLORS = gql`
query Query {
    Colors {
      _id
      createdAt
      name
      userId
      hexCode
      references
    }
  }
`;
export const QUERY_ALL_PALETTES = gql`
query Palettes {
  Palettes {
    _id
    userId
    paletteName
    createdAt
    color1
    color2
    color3
    color4
    color5
    colors
  }
}
`;

export const QUERY_GRADIENT = gql`
query Gradient($gradientId: ID!) {
    Gradient(id: $gradientId) {
      _id
      userId
      color
      gradientName
      createdAt
    }
  }
`;

export const QUERY_ALL_GRADIENTS = gql`
query Gradients {
    Gradients {
      _id
      userId
      gradientName
      createdAt
      color
    }
  }
`;

export const QUERY_SINGLE_USER = gql`
query User($userId: ID!) {
    User(UserId: $userId) {
      _id
      email
      name
      password
    }
  }
`;

export const QUERY_ALL_USERS = gql`
    query Users {
        Users {
            _id
            email
            name
            password
        }
    }
`;