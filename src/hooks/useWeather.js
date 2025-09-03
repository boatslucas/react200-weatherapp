import { useContext } from "react";
import WeatherContext from "../context/WeatherContext";

const OPENWEATHERMAP_API_KEY = import.meta.env.VITE_REACT_APP_API_KEY;

const useWeather = () => {
  const { state, dispatch } = useContext(WeatherContext);

  const searchLocations = async (input) => {
    if (!input) return;
    dispatch({ type: "FETCH_START" });

    try {
      const geoRes = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(
          input
        )}&limit=5&appid=${OPENWEATHERMAP_API_KEY}`
      );


      const geoData = await geoRes.json();

      if (!geoData.length) throw new Error("Location not found");

      dispatch({ type: "FETCH_LOCATIONS", payload: geoData });
    } catch (err) {
      dispatch({ type: "FETCH_ERROR", payload: err.message });
    }
  };

  const fetchWeatherForLocation = async (location) => {
    const { lat, lon, name, state: resolvedState, country } = location;

    dispatch({ type: "FETCH_START" });

    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${OPENWEATHERMAP_API_KEY}`
      );

      if (!res.ok) throw new Error("Weather data not found");

      const data = await res.json();

      dispatch({
        type: "FETCH_SUCCESS",
        payload: {
          city: name,
          state: resolvedState,
          country,
          temp: data.main.temp,
          condition: data.weather[0].description,
          humidity: data.main.humidity,
          windSpeed: data.wind.speed,
          details: data,
        },
      });
    } catch (err) {
      dispatch({ type: "FETCH_ERROR", payload: err.message });
    }
  };

  return { ...state, searchLocations, fetchWeatherForLocation };
};

export default useWeather;