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