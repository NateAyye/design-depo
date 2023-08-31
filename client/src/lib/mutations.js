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

export const CREATE_FONT = gql`
mutation CreateFont($activeFontFamily: String!, $fontName: String!, $userId: ID!) {
  createFont(activeFontFamily: $activeFontFamily, fontName: $fontName, userId: $userId) {
    _id
    fontName
    userId
    activeFontFamily
  }
}
`;

export const DELETE_FONT = gql`
mutation DeleteFont($id: ID!) {
  deleteFont(id: $id) {
    _id
    fontName
    userId
    activeFontFamily
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

export const UPDATE_PALETTE = gql`
mutation UpdatePalette($id: ID!, $paletteName: String, $color1: String, $color2: String, $color3: String, $color4: String, $color5: String) {
  updatePalette(id: $id, paletteName: $paletteName, color1: $color1, color2: $color2, color3: $color3, color4: $color4, color5: $color5) {
    _id
    userId
    paletteName
    createdAt
    color1
    color2
    color3
    color4
    colors
    color5
  }
}
`

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
mutation UpdateColor($id: ID!, $hexCode: String, $name: String) {
    updateColor(id: $id, name: $name, hexCode: $hexCode) {
      _id
      createdAt
      hexCode
      userId
      name
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

export const CREATE_GRADIENT = gql`
mutation CreateGradient($gradientName: String!, $color: String!, $userId: ID!) {
    createGradient(gradientName: $gradientName, color: $color, userId: $userId) {
      _id
      userId
      gradientName
      color
      createdAt
    }
  }
`;

export const DELETE_GRADIENT = gql`
mutation DeleteGradient($id: ID!) {
    deleteGradient(id: $id) {
      _id
      color
      userId
      createdAt
      gradientName
    }
  }
`;

export const UPDATE_GRADIENT = gql`
    mutation UpdateGradient($id: ID!, $gradientName: String!, $color: String!) {
        updateGradient(id: $id, gradientName: $gradientName, color: $color) {
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