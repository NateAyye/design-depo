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

export const ADD_Project =gql`
mutation CreateProject($userName: ID!, $projectName: String!) {
  createProject(userName: $userName, projectName: $projectName) {
    _id
    userName {
      _id
      name
      email
      password
    }
    projectName
    palettes {
      _id
      paletteName
      createdAt
      color1
      color2
      color3
      color4
      color5
      colors
    }
    gradients {
      _id
      gradientName
      color
      createdAt
    }
    colors {
      _id
      createdAt
      hexCode
      name
      userId
      references
    }
    fonts {
      _id
      activeFontFamily
    }
  }
}`;

export const DELETE_PROJECT=gql`
mutation DeleteProject($deleteProjectId: ID!) {
  deleteProject(id: $deleteProjectId) {
    _id
    userName {
      _id
      name
      email
      password
    }
    projectName
    palettes {
      _id
      paletteName
      createdAt
      color1
      color2
      color3
      color4
      color5
      colors
    }
    gradients {
      _id
      gradientName
      color
      createdAt
    }
    colors {
      _id
      createdAt
      hexCode
      name
      userId
      references
    }
    fonts {
      _id
      activeFontFamily
    }
  }
}`;

export const UPDATE_PROJECT=gql`
mutation UpdateProjectName($updateProjectNameId: ID!, $newProjectName: String!) {
  updateProjectName(id: $updateProjectNameId, newProjectName: $newProjectName) {
    _id
    projectName
    userName {
      _id
      name
      email
      password
    }
    palettes {
      _id
      paletteName
      createdAt
      color1
      color2
      color3
      color4
      color5
      colors
    }
    gradients {
      _id
      gradientName
      color
      createdAt
    }
    colors {
      _id
      createdAt
      hexCode
      name
      userId
      references
    }
    fonts {
      _id
      activeFontFamily
    }
  }
}`;