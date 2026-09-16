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
Object.defineProperty(exports, "__esModule", { value: true });
const api_1 = require("./api");
function runAsyncAwaitVersion() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("Starting async/await version...");
        try {
            // Fetch weather first
            const weather = yield (0, api_1.fetchWeatherPromise)();
            console.log("\n=== WEATHER ===");
            console.log("Temperature:", weather.current.temperature_2m, weather.current_units.temperature_2m);
            console.log("Wind:", weather.current.wind_speed_10m, weather.current_units.wind_speed_10m);
            // Fetch news after weather
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
function runParallelRequests() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("\nStarting parallel requests...");
        try {
            const [weather, news] = yield Promise.all([
                (0, api_1.fetchWeatherPromise)(),
                (0, api_1.fetchNewsPromise)()
            ]);
            console.log("\n=== PARALLEL RESULTS ===");
            console.log("Temperature:", weather.current.temperature_2m, weather.current_units.temperature_2m);
            console.log("Wind:", weather.current.wind_speed_10m, weather.current_units.wind_speed_10m);
            console.log("News articles:", news.posts.length);
            console.log("Parallel requests completed!");
        }
        catch (error) {
            if (error instanceof Error) {
                console.error("Parallel request error:", error.message);
            }
            else {
                console.error("Parallel request error: Unknown error");
            }
        }
    });
}
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        yield runAsyncAwaitVersion();
        yield runParallelRequests();
    });
}
main();
