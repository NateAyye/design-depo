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
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
            user {
                _id
                name
            }
        }
    }
`;

export const DELETE_USER = gql`
    mutation deleteUser($userId: String!) {
        deleteUser(userId: $userID) {
            _id
            name
            projects
        }
    }
`;