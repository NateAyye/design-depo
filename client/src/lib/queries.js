import { gql } from '@apollo/client';

export const QUERY_SINGLE_COLOR = gql`
query Query($colorId: ID!) {
    Color(id: $colorId) {
      
    }
  }
`;

export const QUERY_ALL_COLORS = gql`
query Query {
    Colors {
      _id
      createdAt
      hexCode
      references
    }
  }
`;

export const QUERY_GRADIENT = gql`
query Gradient($gradientId: ID!) {
    Gradient(id: $gradientId) {
      _id
      createdAt
      hexCode
      references
    }
  }
`;

export const QUERY_ALL_GRADIENTS = gql`
query Gradients {
    Gradients {
      _id
      createdAt
      hexCode
      references
    }
  }
`;