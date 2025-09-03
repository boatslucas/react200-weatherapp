import { useContext } from "react";
import WeatherContext from "../context/WeatherContext";

const WeatherDisplay = () => {
  const { weather, loading, error } = useContext(WeatherContext).state;

  if (loading)
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-lg font-semibold animate-pulse text-blue-700">
          Fetching your forecast...
        </p>
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-lg font-semibold text-red-600">Error: {error}</p>
      </div>
    );

  if (!weather)
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-500 text-lg">Search for a city to see the weather.</p>
      </div>
    );

  const { city, state, country, temp, condition, humidity, windSpeed, details } = weather;
  const icon = details?.weather[0]?.icon;

  return (
    <div className="max-w-md mx-auto p-6 rounded-2xl shadow-lg bg-gradient-to-br from-blue-400 to-indigo-600 text-white">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">
          {city} {state ? `, ${state}` : ""}, {country}
        </h2>
        {icon && (
          <img
            src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
            alt={condition}
            className="w-16 h-16"
          />
        )}
      </div>

      <div className="text-center mb-4">
        <p className="text-5xl font-extrabold">{Math.round(temp)}°F</p>
        <p className="capitalize text-xl">{condition}</p>
      </div>

      <div className="grid grid-cols-2 gap-4 text-center text-sm">
        <div className="bg-white/20 rounded-xl p-3 shadow-md">
          <p className="font-semibold">Humidity</p>
          <p>{humidity}%</p>
        </div>

        <div className="bg-white/20 rounded-xl p-3 shadow-md">
          <p className="font-semibold">Wind Speed</p>
          <p>{windSpeed} mph</p>
        </div>
      </div>
    </div>
  );
};

export default WeatherDisplay;
