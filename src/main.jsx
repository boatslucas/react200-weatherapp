import ReactDOM from "react-dom/client";
import App from "./App";
import { WeatherProvider } from "./context/WeatherContext";
import { MusicProvider } from "./context/MusicProvider";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <MusicProvider>
    <WeatherProvider>
      <App />
    </WeatherProvider>
  </MusicProvider>
);