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

export const QUERY_USER_COLORS = gql`
query UserColors($userId: ID!) {
  UserColors(userId: $userId) {
    _id
    createdAt
    hexCode
    name
    userId
    references
  }
}
`

export const QUERY_USERS_ITEMS = gql`

query GetUserItems($userId: ID!) {
  GetUserItems(userId: $userId) {
    gradients {
      _id
      userId
      gradientName
      color
      createdAt
    }
    palettes {
      _id
      userId
      paletteName
      createdAt
      color1
      color2
      color3
      color4
      color5
      colors
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
      fontName
      userId
      activeFontFamily
    }
    projects {
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
        userId
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
        userId
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
        fontName
        userId
        activeFontFamily
      }
    }
  }
}

`

export const QUERY_USER_GRADIENTS = gql`
query UserGradients($userId: ID!) {
  UserGradients(userId: $userId) {
    _id
    userId
    gradientName
    color
    createdAt
  }
}
`

export const QUERY_ALL_FONTS = gql`
query Fonts {
  Fonts {
    _id
    fontName
    userId
    activeFontFamily
  }
}
`;
export const QUERY_ALL_PALETTES = gql`
query Palettes {
  Palettes {
    _id
    userId
    paletteName
    createdAt
    color1
    color2
    color3
    color4
    color5
    colors
  }
}
`;

export const QUERY_GRADIENT = gql`
query Gradient($gradientId: ID!) {
    Gradient(id: $gradientId) {
      _id
      userId
      color
      gradientName
      createdAt
    }
  }
`;

export const QUERY_ALL_GRADIENTS = gql`
query Gradients {
    Gradients {
      _id
      userId
      gradientName
      createdAt
      color
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