import { useReducer } from 'react';
import { INITIAL_COLORS } from '../../config/constants';
import { SET_COLOR_NAME, SET_DISPLAY_COLOR_PICKER, SET_HEX, SET_HSL, SET_MODAL_OPEN, SET_RGB } from './actions';

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
    case SET_DISPLAY_COLOR_PICKER:
      return {
        ...state,
        displayModalPicker: action.payload
      }
    case SET_MODAL_OPEN:
      return {
        ...state,
        isModalOpen: action.payload
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