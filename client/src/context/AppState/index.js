import React, { createContext, useContext, useEffect } from "react";
import authService from "../../lib/auth";
import { USER_LOGGED_IN } from "./actions";
import { useAppReducer } from './reducers';
import store from './store';

const AppContext = createContext();
const { Provider } = AppContext;

const AppProvider = ({ value = [], ...props }) => {
  const [state, dispatch] = useAppReducer({
    palettes: [],
    colors: [],
    gradients: [],
    fonts: [],
    projects: [],
    colorFormat: 'hex6',
    isModalOpen: false,
    logged_in: false,
    jwt: '',
    activeDashboardTab: localStorage.getItem('activeDashboardTab') || 'palettes',
  });

  useEffect(() => {
    dispatch({ type: USER_LOGGED_IN, payload: authService.loggedIn() })
  }, [dispatch])

  return <Provider store={store} value={[state, dispatch]} {...props} />;
};

const useAppContext = () => {
  return useContext(AppContext);
};

export { AppProvider, useAppContext };

