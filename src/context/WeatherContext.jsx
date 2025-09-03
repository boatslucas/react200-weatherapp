import { createContext, useReducer } from "react";

const WeatherContext = createContext();

const initialState = {
  loading: false,
  error: null,
  locations: [], // list of possible matches
  weather: null, // chosen location's weather
};

const weatherReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_START":
      return { ...state, loading: true, error: null };

    case "FETCH_LOCATIONS":
      return { ...state, loading: false, error: null, locations: action.payload, weather: null };

    case "FETCH_SUCCESS":
      return { ...state, loading: false, error: null, weather: action.payload, locations: [] };

    case "FETCH_ERROR":
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

// eslint-disable-next-line react/prop-types
export const WeatherProvider = ({ children }) => {
  const [state, dispatch] = useReducer(weatherReducer, initialState);

  return <WeatherContext.Provider value={{ state, dispatch }}>{children}</WeatherContext.Provider>;
};

export default WeatherContext;

