import React, { createContext, useContext } from "react";
import { INITIAL_PALETTES } from "../../config/constants";
import { useAppReducer } from './reducers';

const AppContext = createContext();
const { Provider } = AppContext;

const AppProvider = ({ value = [], ...props }) => {
  const [state, dispatch] = useAppReducer({
    palettes: INITIAL_PALETTES,
    colors: [],
    gradients: [],
    fonts: [],
    projects: [],
    colorFormat: 'hex6',
    isModalOpen: false,
    jwt: '',
    activeDashboardTab: localStorage.getItem('activeDashboardTab') || 'palettes',
  });


  return <Provider value={[state, dispatch]} {...props} />;
};

const useAppContext = () => {
  return useContext(AppContext);
};

export { AppProvider, useAppContext };

