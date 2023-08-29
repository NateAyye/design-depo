import { gql } from '@apollo/client';

export const QUERY_SINGLE_COLOR = gql`
query Query($colorId: ID!) {
    Color(id: $colorId) {
      
    }
  }
`;