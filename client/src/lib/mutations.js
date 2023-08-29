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

export const ADD_USER = gql`
    mutation createUser($name: String!, $email: String!, $password: String!) {
        createUser(name: $name, email: $email, password: $password) {
            token
            user {
                _id
                name
            }
        }
    }
`;