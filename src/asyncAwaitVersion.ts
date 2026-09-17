import readline from "node:readline";
import {searchCity, fetchWeatherPromise,fetchNewsPromise,getWeatherDescription} from "./api";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function askQuestion(question: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(question, resolve);
  });
}
// Implementing async/await to fetch weather and news data for a given city and log the results to the console
async function runAsyncAwaitVersion(
  latitude: number,
  longitude: number,
  cityName: string
): Promise<void> {

  console.log("\nStarting async/await version...");

  try {
    const weather = await fetchWeatherPromise(  latitude, longitude );

    console.log("\n=== WEATHER ===");

    console.log("City:",  cityName);
    console.log( "Temperature:", weather.current.temperature_2m,weather.current_units.temperature_2m);
    console.log("Wind:", weather.current.wind_speed_10m, weather.current_units.wind_speed_10m );
    console.log("Weather :", getWeatherDescription(weather.current.weather_code));

    const news = await fetchNewsPromise();

    console.log("\n=== NEWS HEADLINES ===");

    news.posts.forEach((post, index) => {
    console.log(`${index + 1}. ${post.title}`);
    });
    console.log("\nAsync/await version completed!");
  } catch (error) {

    if (error instanceof Error) {
      console.error( "Async/await error:", error.message);
    } else {
      console.error("Async/await error: Unknown error");
    }
  }
}

async function main(): Promise<void> {

  console.log("Starting city search...");

  const city = await askQuestion(
    "Enter a city: "
  );

  searchCity(city, async (cityError, location) => {

    if (cityError) {
      console.error( "City error:", cityError.message );
      rl.close();
      return;
    }

    if (!location) {
      console.error("City location is unavailable.");
      rl.close();
      return;
    }

    console.log( `\nCity found: ${location.name}` );

    await runAsyncAwaitVersion(  location.latitude, location.longitude,location.name )
  
    rl.close();
  });
}

main();