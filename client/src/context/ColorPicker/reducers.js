import { useReducer } from 'react';
import { INITIAL_COLORS } from '../../config/constants';
import { ADD_COLOR, REMOVE_COLOR, SET_COLOR, SET_COLORS, SET_DISPLAY_COLOR_PICKER, SET_HEX, SET_HSL, SET_NAME, SET_RGB, UPDATE_COLOR } from './actions';

export const initialState = {
  colors: INITIAL_COLORS
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_RGB:
      return {
        ...state,
        rgbValue: action.payload
      }
    case SET_HSL:
      return {
        ...state,
        hslValue: action.payload
      }
    case SET_HEX:
      return {
        ...state,
        hexValue: action.payload
      }
    case SET_NAME:
      return {
        ...state,
        colorName: action.payload
      }

    case SET_COLORS:
      return {
        ...state,
        colors: action.payload
      }
    case SET_DISPLAY_COLOR_PICKER:
      return {
        ...state,
        displayModalPicker: action.payload
      }
    case SET_COLOR:
      return {
        ...state,
        colors: state.colors.map(c => c.id === action.color.id ? action.color : c)
      }
    case ADD_COLOR:
      console.log(state.colors);
      const newColor = {
        id: state.colors[state.colors?.length - 1].id + 1 || 1,
        name: action.payload.name,
        color: action.payload.color
      }
      return {
        ...state,
        colors: [...state.colors, newColor]
      }
    case UPDATE_COLOR:
      return {
        ...state,
        colors: state.colors.map(c => c.id === action.payload.id ? action.payload : c)
      }
    case REMOVE_COLOR:
      return {
        ...state,
        colors: state.colors.filter(c => c.id !== action.payload)
      }
    default:
      return state
  }
}

export function useColorsReducer(initialState) {
  return useReducer(reducer, initialState)
}