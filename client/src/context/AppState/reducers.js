import { useReducer } from "react";
import { ADD_COLOR, ADD_FONT, ADD_GRADIENT, ADD_PALETTE, ADD_PROJECT, REMOVE_COLOR, REMOVE_FONT, REMOVE_GRADIENT, REMOVE_JWT, REMOVE_PALETTE, REMOVE_PROJECT, SET_COLORS, SET_COLOR_FORMAT, SET_FONTS, SET_GRADIENTS, SET_JWT, SET_MODAL_OPEN, SET_PALETTES, SET_PROJECTS, SET_TAB, UPDATE_COLOR, UPDATE_FONT, UPDATE_GRADIENT, UPDATE_PALETTE, UPDATE_PROJECT, USER_LOGGED_IN } from "./actions";

export const reducer = (state, action) => {
  switch (action.type) {
    case USER_LOGGED_IN:
      return {
        ...state,
        logged_in: action.payload
      };
    case ADD_COLOR:
      return {
        ...state,
        colors: [...state.colors, ...action.payload]
      };
    case REMOVE_COLOR:
      return {
        ...state,
        colors: state.colors.filter(c => c._id !== action.payload)
      };
    case UPDATE_COLOR:
      return {
        ...state,
        colors: state.colors.map(c => c.id === action.payload._id ? action.payload : c)
      };
    case SET_COLORS:
      return {
        ...state,
        colors: action.payload
      };

    case ADD_PALETTE:
      const newPalette = {
        ...action.payload
      };
      return {
        ...state,
        palettes: [...state.palettes, newPalette]
      };
    case REMOVE_PALETTE:
      return {
        ...state,
        palettes: state.palettes.filter(p => p._id !== action.payload)
      };
    case UPDATE_PALETTE:
      return {
        ...state,
        palettes: state.palettes.map(p => p._id === action.payload._id ? action.payload : p)
      };
    case SET_PALETTES:
      return {
        ...state,
        palettes: action.payload
      };

    case ADD_GRADIENT:
      const newGradient = {
        ...action.payload
      };
      return {
        ...state,
        gradients: [...state.gradients, newGradient]
      };
    case REMOVE_GRADIENT:
      return {
        ...state,
        gradients: state.gradients.filter(g => g._id !== action.payload)
      };
    case UPDATE_GRADIENT:
      return {
        ...state,
        gradients: state.gradients.map(g => g._id === action.payload._id ? action.payload : g)
      };
    case SET_GRADIENTS:
      return {
        ...state,
        gradients: action.payload
      };

    case ADD_FONT:
      const newFont = {
        ...action.payload
      };
      return {
        ...state,
        fonts: [...state.fonts, newFont]
      };
    case REMOVE_FONT:
      return {
        ...state,
        fonts: state.fonts.filter(f => f._id !== action.payload)
      };
    case UPDATE_FONT:
      return {
        ...state,
        fonts: state.fonts.map(f => f._id === action.payload._id ? action.payload : f)
      };
    case SET_FONTS:
      return {
        ...state,
        fonts: action.payload
      };

    case ADD_PROJECT:
      const newProject = {
        ...action.payload
      };
      return {
        ...state,
        projects: [...state.projects, newProject]
      };
    case REMOVE_PROJECT:
      return {
        ...state,
        projects: state.projects.filter(p => p._id !== action.payload)
      };
    case UPDATE_PROJECT:
      return {
        ...state,
        projects: state.projects.map(p => p._id === action.payload._id ? action.payload : p)
      };
    case SET_PROJECTS:
      return {
        ...state,
        projects: action.payload
      };

    case SET_JWT:
      return {
        ...state,
        jwt: action.payload
      };
    case REMOVE_JWT:
      return {
        ...state,
        jwt: null
      };
    case SET_TAB:
      return {
        ...state,
        activeDashboardTab: action.payload
      };

    case SET_COLOR_FORMAT:
      return {
        ...state,
        colorFormat: action.payload
      };

    case SET_MODAL_OPEN:
      return {
        ...state,
        isModalOpen: action.payload
      };

    default:
      return state;
  }
}

export function useAppReducer(initialState) {
  return useReducer(reducer, initialState)
}