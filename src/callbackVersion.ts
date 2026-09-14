import { fetchWeather, fetchNews } from "./api";
import { WeatherData, NewsData } from "./types";

console.log("Starting callback version...");

fetchWeather((weatherError, weather) => {
  if (weatherError) {
    console.error("Weather error:", weatherError.message );
    return;
  }
  if (!weather) {
    console.error("Weather data is unavailable.");
    return;
  }
  console.log("\n=== WEATHER ===");
  console.log( "Temperature:",weather.current.temperature_2m);
  console.log("Wind:", weather.current.wind_speed_10m);

  // Second asynchronous request
  fetchNews((newsError, news) => {
    if (newsError) {
      console.error("News error:",newsError.message );
      return;
    }
   if (!news) {
      console.error("News data is unavailable.");
      return;
    }

    console.log("\n=== NEWS HEADLINES ===");
    news.posts.forEach(
      (post: any, index: number) => {
        console.log(`${index + 1}. ${post.title}`);
      }
    );

    console.log("\nCallback version completed!");
  });
});