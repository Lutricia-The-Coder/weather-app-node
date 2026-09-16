import readline from "node:readline";
import {searchCity, fetchWeatherPromise, fetchNewsPromise} from "./api";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log("Starting Promise version...");
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

    fetchWeatherPromise(  location.latitude,location.longitude )
      .then((weather) => {
        console.log("\n=== WEATHER ===");
        console.log( "Temperature:", weather.current.temperature_2m, weather.current_units.temperature_2m );
        console.log( "Wind:",weather.current.wind_speed_10m, weather.current_units.wind_speed_10m);
console.log( "Weather code:", weather.current.weather_code);
        return fetchNewsPromise();
      })
      .then((news) => {

        console.log("\n=== NEWS HEADLINES ===");

        news.posts.forEach((post, index) => {
          console.log(`${index + 1}. ${post.title}`);
        });

        console.log(
          "\nPromise chain completed!" );

        return runPromiseExamples(location.latitude, location.longitude
        );
      })
      .catch((error) => {

        if (error instanceof Error) {
          console.error(  "Promise error:", error.message);
        } else {
          console.error( "Promise error: Unknown error" );
        }
        rl.close();
      });
  });
});

async function runPromiseExamples( latitude: number, longitude: number): Promise<void> {
  console.log("\nStarting Promise.all()...");

  try {
    const [weather, news] = await Promise.all([
      fetchWeatherPromise(latitude, longitude),  fetchNewsPromise()
    ]);

    console.log("\n=== PROMISE.ALL RESULTS ===");

    console.log( "Temperature:",  weather.current.temperature_2m, weather.current_units.temperature_2m);
    console.log("Wind:",weather.current.wind_speed_10m, weather.current_units.wind_speed_10m);
    console.log("Weather code:", weather.current.weather_code);
    console.log( "Number of news articles:", news.posts.length);
 console.log("Promise.all() completed!" );

  } catch (error) {

    if (error instanceof Error) {
      console.error( "Promise.all() error:", error.message );
    } else {
      console.error("Promise.all() error: Unknown error");
    }
  }

  console.log("\nStarting Promise.race()...");

  try {
    const firstResult = await Promise.race([
      fetchWeatherPromise(latitude, longitude)
        .then(() => "Weather request finished first"),

      fetchNewsPromise()
        .then(() => "News request finished first")
    ]);

    console.log("\n=== PROMISE.RACE RESULT ===");
    console.log(firstResult);
    console.log("Promise.race() completed!");

  } catch (error) {

    if (error instanceof Error) {
      console.error( "Promise.race() error:",error.message);
    } else {
      console.error(  "Promise.race() error: Unknown error");
    }
  }
  rl.close();
}