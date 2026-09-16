import {
  fetchWeatherPromise,
  fetchNewsPromise
} from "./api";

async function runAsyncAwaitVersion(): Promise<void> {
  console.log("Starting async/await version...");

  try {
    // Fetch weather first
    const weather = await fetchWeatherPromise();

    console.log("\n=== WEATHER ===");

    console.log(
      "Temperature:",
      weather.current.temperature_2m,
      weather.current_units.temperature_2m
    );

    console.log(
      "Wind:",
      weather.current.wind_speed_10m,
      weather.current_units.wind_speed_10m
    );

    // Fetch news after weather
    const news = await fetchNewsPromise();

    console.log("\n=== NEWS HEADLINES ===");

    news.posts.forEach((post, index) => {
      console.log(`${index + 1}. ${post.title}`);
    });

    console.log("\nAsync/await version completed!");

  } catch (error) {

    if (error instanceof Error) {
      console.error(
        "Async/await error:",
        error.message
      );
    } else {
      console.error(
        "Async/await error: Unknown error"
      );
    }
  }
}

async function runParallelRequests(): Promise<void> {
  console.log("\nStarting parallel requests...");

  try {
    const [weather, news] = await Promise.all([
      fetchWeatherPromise(),
      fetchNewsPromise()
    ]);

    console.log("\n=== PARALLEL RESULTS ===");

    console.log(
      "Temperature:",
      weather.current.temperature_2m,
      weather.current_units.temperature_2m
    );

    console.log(
      "Wind:",
      weather.current.wind_speed_10m,
      weather.current_units.wind_speed_10m
    );

    console.log(
      "News articles:",
      news.posts.length
    );

    console.log(
      "Parallel requests completed!"
    );

  } catch (error) {

    if (error instanceof Error) {
      console.error(
        "Parallel request error:",
        error.message
      );
    } else {
      console.error(
        "Parallel request error: Unknown error"
      );
    }
  }
}

async function main(): Promise<void> {
  await runAsyncAwaitVersion();
  await runParallelRequests();
}

main();