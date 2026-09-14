import { fetchWeather } from "./api";

fetchWeather((error, weather) => {

  if (error) {
    console.error("Weather error:", error.message);
    return;
  }

  console.log("Weather response received!");
  console.log( "Temperature:", weather.current.temperature_2m);
  console.log( "Wind:", weather.current.wind_speed_10m);

});