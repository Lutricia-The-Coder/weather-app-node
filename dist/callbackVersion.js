"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const api_1 = require("./api");
console.log("Starting callback version...");
(0, api_1.fetchWeather)((weatherError, weather) => {
    if (weatherError) {
        console.error("Weather error:", weatherError.message);
        return;
    }
    if (!weather) {
        console.error("Weather data is unavailable.");
        return;
    }
    console.log("\n=== WEATHER ===");
    console.log("Temperature:", weather.current.temperature_2m);
    console.log("Wind:", weather.current.wind_speed_10m);
    // Second asynchronous request
    (0, api_1.fetchNews)((newsError, news) => {
        if (newsError) {
            console.error("News error:", newsError.message);
            return;
        }
        if (!news) {
            console.error("News data is unavailable.");
            return;
        }
        console.log("\n=== NEWS HEADLINES ===");
        news.posts.forEach((post, index) => {
            console.log(`${index + 1}. ${post.title}`);
        });
        console.log("\nCallback version completed!");
    });
});
