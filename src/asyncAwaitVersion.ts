import readline from "node:readline";
import {searchCity, fetchWeatherPromise,fetchNewsPromise} from "./api";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function askQuestion(question: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(question, resolve);
  });
}

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
    console.log("Weather code:", weather.current.weather_code);

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

async function runParallelRequests( latitude: number,longitude: number
): Promise<void> {

  console.log("\nStarting parallel requests...");

  try {
    const [weather, news] = await Promise.all([
      fetchWeatherPromise(latitude, longitude),
      fetchNewsPromise()
    ]);

    console.log("\n=== PARALLEL RESULTS ===");

    console.log("Temperature:",weather.current.temperature_2m,  weather.current_units.temperature_2m);
    console.log( "Wind:",weather.current.wind_speed_10m,weather.current_units.wind_speed_10m);
    console.log( "Weather code:", weather.current.weather_code);
    console.log( "News articles:", news.posts.length);
    console.log("Parallel requests completed!");

  } catch (error) {

    if (error instanceof Error) {
      console.error(  "Parallel request error:",error.message);
    } else {
      console.error( "Parallel request error: Unknown error");
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
    await runParallelRequests( location.latitude, location.longitude);
    rl.close();
  });
}

main();