import React, { createContext, useCallback, useContext, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { generateRandomColor, getColorName, hexToRgb } from "../../lib/colors";
import { useAppContext } from "../AppState";
import { SET_COLOR_NAME, SET_HEX, SET_RGB } from "./actions";
import { useColorsReducer } from './reducers';

const ColorPickerContext = createContext();
const { Provider } = ColorPickerContext;

const ColorPickerProvider = ({ value = [], ...props }) => {
  const [searchParams] = useSearchParams();
  const color = searchParams.get('color') || generateRandomColor();
  const [appState] = useAppContext();
  const [state, dispatch] = useColorsReducer({
    colorName: '',
    hexValue: color,
    hslValue: { h: 0, s: 0, l: 0, a: 1 },
    rgbValue: hexToRgb(color),
    displayModalPicker: false,
  });

  const resetColor = useCallback(async (colorVal) => {
    dispatch({ type: SET_HEX, payload: colorVal })
    dispatch({ type: SET_RGB, payload: hexToRgb(colorVal) })
    dispatch({ type: SET_COLOR_NAME, payload: await getColorName(colorVal) })
  }, [dispatch])

  const onKeyDown = useCallback(async (e) => {
    if (appState.isModalOpen) return;
    if (e.code === 'Space') {
      e.preventDefault();
      const randomColor = generateRandomColor();
      await resetColor(randomColor);
    }
  }, [appState.isModalOpen, resetColor])


  useEffect(() => {
    resetColor(color);
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [onKeyDown, resetColor]) // eslint-disable-line
  // ^^^^^^^ DO NOT TOUCH DEPENDANCY ARRAY PLEASE ^^^^^^

  return <Provider value={[state, dispatch]} {...props} />;
};

const useColorPickerContext = () => {
  return useContext(ColorPickerContext);
};

export { ColorPickerProvider, useColorPickerContext };

