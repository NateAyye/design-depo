import React, { createContext, useContext, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { generateRandomColor, getColorName, hexToRgb } from "../../lib/colors";
import { SET_HEX, SET_NAME, SET_RGB } from "./actions";
import { useColorsReducer } from './reducers';

const ColorPickerContext = createContext();
const { Provider } = ColorPickerContext;

const ColorPickerProvider = ({ value = [], ...props }) => {
  const [searchParams] = useSearchParams();
  const color = searchParams.get('color') || generateRandomColor();
  const [state, dispatch] = useColorsReducer({
    colorName: '',
    color: '',
    hexValue: color,
    modalOpen: false,
    displayModalPicker: false,
    hslValue: { h: 0, s: 0, l: 0, a: 1 },
    rgbValue: hexToRgb(color)
  });

  useEffect(() => {
    async function loadColorName() {
      dispatch({ type: SET_NAME, payload: await getColorName(color) })
    }

    async function onKeyDown(e) {
      if (state.modalOpen) return;
      if (e.code === 'Space') {
        e.preventDefault();
        const randomColor = generateRandomColor();
        dispatch({ type: SET_HEX, payload: randomColor })
        dispatch({ type: SET_RGB, payload: randomColor })
        loadColorName();
      }
    }
    dispatch({ type: SET_HEX, payload: color })
    dispatch({ type: SET_RGB, payload: color })
    loadColorName();

    document.addEventListener('keydown', onKeyDown)

    return () => {
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [])

  return <Provider value={[state, dispatch]} {...props} />;
};

const useColorPickerContext = () => {
  return useContext(ColorPickerContext);
};

export { ColorPickerProvider, useColorPickerContext };

