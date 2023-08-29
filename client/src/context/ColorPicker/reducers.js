import { useReducer } from 'react';
import { INITIAL_COLORS } from '../../config/constants';
import { SET_COLOR_NAME, SET_HEX, SET_RGB } from './actions';

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
    case SET_HEX:
      return {
        ...state,
        hexValue: action.payload
      }
    case SET_COLOR_NAME:
      return {
        ...state,
        colorName: action.payload
      }
    default:
      return state
  }
}

export function useColorsReducer(initialState) {
  return useReducer(reducer, initialState)
}