import readline from "node:readline";
import { searchCity, fetchWeather, fetchNews ,  getWeatherDescription} from "./api";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log("Starting callback version...");

rl.question("Enter a city: ", (city) => {

  searchCity(city, (cityError, location) => {

    if (cityError) {
      console.error("City error:", cityError.message);
      rl.close();
      return;
    }

    if (!location) {
      console.error("City location is unavailable.");
      rl.close();
      return;
    }
    console.log(`\nCity found: ${location.name}`);

    fetchWeather(
      location.latitude,
      location.longitude,
      (weatherError, weather) => {
        if (weatherError) {
          console.error("Weather error:",weatherError.message);
          rl.close();
          return;
        }
//if weather data is unavailable , return an error message and close the readline interface
        if (!weather) {
          console.error("Weather data is unavailable." );
           rl.close();
          return;
        }

        console.log("\n=== WEATHER ===");

        console.log("Temperature:",weather.current.temperature_2m,weather.current_units.temperature_2m );
        console.log("Wind:", weather.current.wind_speed_10m, weather.current_units.wind_speed_10m  );
        console.log("Weather :", getWeatherDescription(weather.current.weather_code));

        fetchNews((newsError, news) => {

          if (newsError) {
            console.error("News error:",newsError.message);
            rl.close();
            return;
          }

          if (!news) {
            console.error( "News data is unavailable.");
            rl.close();
            return;
          }

          console.log("\n=== NEWS HEADLINES ===");

          news.posts.forEach((post, index) => {
            console.log( `${index + 1}. ${post.title}` );
          });

          console.log( "\nCallback version completed!" );
          rl.close();
        });
      }
    );
  });
});