"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
console.log("Starting Promise version...");
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
        (0, api_1.fetchWeatherPromise)(location.latitude, location.longitude)
            .then((weather) => {
            console.log("\n=== WEATHER ===");
            console.log("Temperature:", weather.current.temperature_2m, weather.current_units.temperature_2m);
            console.log("Wind:", weather.current.wind_speed_10m, weather.current_units.wind_speed_10m);
            console.log("Weather :", (0, api_1.getWeatherDescription)(weather.current.weather_code));
            return (0, api_1.fetchNewsPromise)();
        })
            .then((news) => {
            console.log("\n=== NEWS HEADLINES ===");
            news.posts.forEach((post, index) => {
                console.log(`${index + 1}. ${post.title}`);
            });
            console.log("\nPromise chain completed!");
            return runPromiseExamples(location.latitude, location.longitude);
        })
            .catch((error) => {
            if (error instanceof Error) {
                console.error("Promise error:", error.message);
            }
            else {
                console.error("Promise error: Unknown error");
            }
            rl.close();
        });
    });
});
function runPromiseExamples(latitude, longitude) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("\nStarting Promise.all()...");
        try {
            const [weather, news] = yield Promise.all([
                (0, api_1.fetchWeatherPromise)(latitude, longitude), (0, api_1.fetchNewsPromise)()
            ]);
            console.log("\n=== PROMISE.ALL RESULTS ===");
            console.log("Temperature:", weather.current.temperature_2m, weather.current_units.temperature_2m);
            console.log("Wind:", weather.current.wind_speed_10m, weather.current_units.wind_speed_10m);
            console.log("Weather :", (0, api_1.getWeatherDescription)(weather.current.weather_code));
            console.log("Number of news articles:", news.posts.length);
            console.log("Promise.all() completed!");
        }
        catch (error) {
            if (error instanceof Error) {
                console.error("Promise.all() error:", error.message);
            }
            else {
                console.error("Promise.all() error: Unknown error");
            }
        }
        console.log("\nStarting Promise.race()...");
        try {
            const firstResult = yield Promise.race([
                (0, api_1.fetchWeatherPromise)(latitude, longitude)
                    .then(() => "Weather request finished first"),
                (0, api_1.fetchNewsPromise)()
                    .then(() => "News request finished first")
            ]);
            console.log("\n=== PROMISE.RACE RESULT ===");
            console.log(firstResult);
            console.log("Promise.race() completed!");
        }
        catch (error) {
            if (error instanceof Error) {
                console.error("Promise.race() error:", error.message);
            }
            else {
                console.error("Promise.race() error: Unknown error");
            }
        }
        rl.close();
    });
}
