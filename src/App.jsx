import { useState } from "react";
import useWeather from "./hooks/useWeather";
import WeatherDisplay from "./components/WeatherDisplay";
import Intro from "./components/Intro";

function WeatherApp() {
  const [showIntro, setShowIntro] = useState(true);
  const [query, setQuery] = useState("");
  const { locations, searchLocations, fetchWeatherForLocation, loading } = useWeather();

  const handleSearch = () => {
    if (query.trim()) searchLocations(query.trim());
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  // Show Intro first
  if (showIntro) {
    return <Intro onFinish={() => setShowIntro(false)} />;
  }

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center p-6">

      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover -z-10"
      >
        <source src="/Hailuo_Video_I want a hyper-realistic video_420067234004459521.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Optional overlay for contrast */}
      <div className="absolute top-0 left-0 w-full h-full bg-black/40 -z-5"></div>

      {/* Centered Content */}
      <div className="z-10 text-center">
        <h1 className="text-4xl font-bold mb-4 text-white drop-shadow-lg">
          Weather App
        </h1>

        <h2 className="text-xl font-semibold mb-6 text-white drop-shadow-lg">
          Get the Weather Where You Are
        </h2>

        {/* Search Bar */}
        <div className="flex w-full max-w-md gap-2 mx-auto">
          <input
            type="text"
            placeholder="City or City, State/Country"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={loading}
            className="flex-1 px-4 py-2 rounded-lg border border-gray-400 bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none shadow-lg"
          />
          <button
            onClick={handleSearch}
            disabled={loading}
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg shadow-md transition-transform transform hover:scale-105"
          >
            Search
          </button>
        </div>
      </div>

      {/* Location Options */}
      {locations.length > 0 && (
        <div className="w-full max-w-md mt-6 bg-white/30 backdrop-blur-sm rounded-xl p-4 shadow-lg z-10">
          <p className="mb-2 font-semibold text-blue-900">Select a location:</p>
          {locations.map((loc, i) => (
            <button
              key={i}
              onClick={() => fetchWeatherForLocation(loc)}
              className="block w-full text-left px-4 py-2 mb-2 bg-white/50 rounded-lg hover:bg-blue-200 transition-colors shadow-sm"
            >
              {loc.name}
              {loc.state ? `, ${loc.state}` : ""}, {loc.country}
            </button>
          ))}
        </div>
      )}

      {/* Weather Display */}
      <WeatherDisplay />
    </div>
  );
}

export default WeatherApp;
