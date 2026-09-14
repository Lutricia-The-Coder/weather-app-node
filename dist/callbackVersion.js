"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_https_1 = __importDefault(require("node:https"));
const latitude = -23.9045;
const longitude = 29.4689;
function fetchWeather(callback) {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}` +
        `&longitude=${longitude}` +
        `&current=temperature_2m,wind_speed_10m,weather_code`;
    node_https_1.default.get(url, (response) => {
        let data = "";
        response.on("data", (chunk) => {
            data += chunk;
        });
        response.on("end", () => {
            try {
                const weather = JSON.parse(data);
                callback(null, weather);
            }
            catch (_a) {
                callback(new Error("Could not parse weather data"));
            }
        });
    }).on("error", (error) => {
        callback(error);
    });
}
fetchWeather((error, weather) => {  
    if (error) {
        console.error("Weather error:", error.message);
        return;
    }
    console.log("Weather response received!");
    console.log("Temperature:", weather.current.temperature_2m);
    console.log("Wind:", weather.current.wind_speed_10m);
});
