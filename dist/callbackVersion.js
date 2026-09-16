"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_readline_1 = __importDefault(require("node:readline"));
const api_1 = require("./api");
const rl = node_readline_1.default.createInterface({
    input: process.stdin,
    output: process.stdout
});
console.log("Starting callback version...");
rl.question("Enter a city: ", (city) => {
    (0, api_1.searchCity)(city, (cityError, location) => {
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
        (0, api_1.fetchWeather)(location.latitude, location.longitude, (weatherError, weather) => {
            if (weatherError) {
                console.error("Weather error:", weatherError.message);
                rl.close();
                return;
            }
            if (!weather) {
                console.error("Weather data is unavailable.");
                rl.close();
                return;
            }
            console.log("\n=== WEATHER ===");
            console.log("Temperature:", weather.current.temperature_2m, weather.current_units.temperature_2m);
            console.log("Wind:", weather.current.wind_speed_10m, weather.current_units.wind_speed_10m);
            console.log("Weather :", (0, api_1.getWeatherDescription)(weather.current.weather_code));
            (0, api_1.fetchNews)((newsError, news) => {
                if (newsError) {
                    console.error("News error:", newsError.message);
                    rl.close();
                    return;
                }
                if (!news) {
                    console.error("News data is unavailable.");
                    rl.close();
                    return;
                }
                console.log("\n=== NEWS HEADLINES ===");
                news.posts.forEach((post, index) => {
                    console.log(`${index + 1}. ${post.title}`);
                });
                console.log("\nCallback version completed!");
                rl.close();
            });
        });
    });
});
