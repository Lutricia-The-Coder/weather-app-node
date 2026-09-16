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
function askQuestion(question) {
    return new Promise((resolve) => {
        rl.question(question, resolve);
    });
}
function runAsyncAwaitVersion(latitude, longitude, cityName) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("\nStarting async/await version...");
        try {
            const weather = yield (0, api_1.fetchWeatherPromise)(latitude, longitude);
            console.log("\n=== WEATHER ===");
            console.log("City:", cityName);
            console.log("Temperature:", weather.current.temperature_2m, weather.current_units.temperature_2m);
            console.log("Wind:", weather.current.wind_speed_10m, weather.current_units.wind_speed_10m);
            console.log("Weather :", (0, api_1.getWeatherDescription)(weather.current.weather_code));
            const news = yield (0, api_1.fetchNewsPromise)();
            console.log("\n=== NEWS HEADLINES ===");
            news.posts.forEach((post, index) => {
                console.log(`${index + 1}. ${post.title}`);
            });
            console.log("\nAsync/await version completed!");
        }
        catch (error) {
            if (error instanceof Error) {
                console.error("Async/await error:", error.message);
            }
            else {
                console.error("Async/await error: Unknown error");
            }
        }
    });
}
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("Starting city search...");
        const city = yield askQuestion("Enter a city: ");
        (0, api_1.searchCity)(city, (cityError, location) => __awaiter(this, void 0, void 0, function* () {
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
            yield runAsyncAwaitVersion(location.latitude, location.longitude, location.name);
            rl.close();
        }));
    });
}
main();
