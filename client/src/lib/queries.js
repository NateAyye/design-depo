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

export const QUERY_ALL_PROJECTS=gql`
query Projects {
  Projects {
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
}
`;

export const QUERY_SINGLE_PROJECT=gql`
query Project($projectId: ID!) {
  Project(id: $projectId) {
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
}
`;