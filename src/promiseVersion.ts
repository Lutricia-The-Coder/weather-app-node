import {fetchWeatherPromise, fetchNewsPromise} from "./api";

console.log("Starting Promise version...");
fetchWeatherPromise()
  .then((weather) => {

    console.log("\n=== WEATHER ===");

    console.log("Temperature:", weather.current.temperature_2m,weather.current_units.temperature_2m  );
    console.log("Wind:", weather.current.wind_speed_10m, weather.current_units.wind_speed_10m );

    // Fetch news after weather has completed
    return fetchNewsPromise();
  })
  .then((news) => {
    console.log("\n=== NEWS HEADLINES ===");

    news.posts.forEach((post, index) => {
      console.log(`${index + 1}. ${post.title}` ); });
    console.log( "\nPromise chain completed!");
  })
  .catch((error: Error) => {
    console.error(  "Promise error:",error.message);
  });

  console.log("\nStarting Promise.all()...");

 // Fetch weather and news at the same time using Promise.all()
Promise.all([fetchWeatherPromise(), fetchNewsPromise()])
  .then(([weather, news]) => {

    console.log("\n=== PROMISE.ALL RESULTS ===");

    console.log("Temperature:", weather.current.temperature_2m,weather.current_units.temperature_2m );
    console.log("Wind:", weather.current.wind_speed_10m,weather.current_units.wind_speed_10m);
    console.log("Number of news articles:", news.posts.length);
    console.log("Promise.all() completed!");
  })
  .catch((error: Error) => {
    console.error("Promise.all() error:",error.message );
  });

  console.log("\nStarting Promise.race()...");
// Fetch weather and news at the same time using Promise.race()
Promise.race([
  fetchWeatherPromise()
    .then(() => "Weather request finished first"),

  fetchNewsPromise()
    .then(() => "News request finished first")
])
  .then((result) => {
    console.log("\n=== PROMISE.RACE RESULT ===");
    console.log(result);
    console.log("Promise.race() completed!");
  })
  .catch((error: Error) => {
    console.error( "Promise.race() error:", error.message );
  });