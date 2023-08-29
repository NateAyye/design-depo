import { gql } from '@apollo/client';

export const CREATE_COLOR = gql`
mutation createColor($hexCode: String!, $name: String!, $userId: ID!) {
  createColor(hexCode: $hexCode, name: $name, userId: $userId) {
    _id
    name
    hexCode
    userId
    createdAt
  }
}
`;
export const CREATE_PALETTE = gql`
mutation CreatePalette($userId: ID!, $paletteName: String!, $color1: String!, $color2: String!, $color3: String!, $color4: String!, $color5: String!) {
  createPalette(userId: $userId, paletteName: $paletteName, color1: $color1, color2: $color2, color3: $color3, color4: $color4, color5: $color5) {
    _id
    userId
    paletteName
    createdAt
    colors
    color1
    color2
    color3
    color4
    color5
  }
}
`;
export const DELETE_PALETTE = gql`
mutation Mutation($paletteId: ID!) {
    deletePalette(id: $paletteId) {
      _id
      userId
      paletteName
      createdAt
      colors
    }
  }
`;

export const CREATE_USER = gql`
mutation CreateUser($name: String!, $email: String!, $password: String!) {
    createUser(name: $name, email: $email, password: $password) {
      token
      User {
        _id
        email
        name
        password
      }
    }
  }
`;
export const LOGIN_USER = gql`
mutation User($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      User {
        _id
        email
        name
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

export const DELETE_COLOR = gql`
mutation Mutation($deleteColorId: ID!) {
    deleteColor(id: $deleteColorId) {
      _id
      createdAt
      hexCode
      references
    }
  }
`;

export const UPDATE_COLOR = gql`
mutation UpdateColor($updateColorId: ID!, $hexCode: String!) {
    updateColor(id: $updateColorId, hexCode: $hexCode) {
      _id
      createdAt
      hexCode
      references
    }
  }
`;
export const UPDATE_USERNAME = gql`
mutation Mutation($updateUserNameId: ID!, $newName: String!) {
    updateUserName(id: $updateUserNameId, newName: $newName) {
      _id
      email
      name
    }
  }
`;

export const ADD_GRADIENT = gql`
mutation CreateGradient($gradientName: String!, $color: String!) {
    createGradient(gradientName: $gradientName, color: $color) {
      _id
      color
      createdAt
      gradientName
    }
  }
`;

export const DELETE_GRADIENT = gql`
mutation DeleteGradient($deleteGradientId: ID!) {
    deleteGradient(id: $deleteGradientId) {
      _id
      color
      createdAt
      gradientName
    }
  }
`;

export const UPDATE_GRADIENT = gql`
    mutation UpdateGradient($updateGradientId: ID!, $gradientName: String!, $color: String!) {
        updateGradient(id: $updateGradientId, gradientName: $gradientName, color: $color) {
        _id
        color
        createdAt
        gradientName
        }
    }
`;