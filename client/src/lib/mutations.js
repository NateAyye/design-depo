import { gql } from '@apollo/client';

export const CREATE_COLOR = gql`
mutation createColor($colorId: ID!, $hexCode: String!) {
    createColor(colorId: $colorId, hexCode: $hexCode) {
        _id
        createdAt
        hexCode
    }
}
`;

export const CREATE_USER = gql`
mutation createUser($name: String!, $email: String!, $password: String!) {
    createUser(name: $name, email: $email, password: $password) {
      
    }
  }
`;
export const LOGIN_USER = gql`
mutation loginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      token
      User {
        
      }
    }
  }
`;

export const DELETE_USER = gql`
    mutation DeleteUser($userId: ID!) {
        deleteUser(UserId: $userId) {
        _id
        email
        name
        }
    }
`;