import {fetchWeatherPromise, fetchNewsPromise} from "./api";

async function runAsyncAwaitVersion(): Promise<void> {
  console.log("Starting async/await version...");

  try {
    // Fetch weather first
    const weather = await fetchWeatherPromise();

    console.log("\n=== WEATHER ===");
    console.log( "Temperature:", weather.current.temperature_2m, weather.current_units.temperature_2m);   
    console.log("Wind:",weather.current.wind_speed_10m,weather.current_units.wind_speed_10m);

    // Fetch news after weather
    const news = await fetchNewsPromise();

    console.log("\n=== NEWS HEADLINES ===");

    news.posts.forEach((post, index) => {
      console.log( `${index + 1}. ${post.title}` );
    });

    console.log("\nAsync/await version completed!");
  } catch (error) {

    if (error instanceof Error) {
      console.error("Async/await error:",error.message );
    } else {
      console.error( "Async/await error: Unknown error" );
    }
  }
}

runAsyncAwaitVersion();