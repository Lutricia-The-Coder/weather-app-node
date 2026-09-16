"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchCity = searchCity;
exports.fetchWeather = fetchWeather;
exports.fetchNews = fetchNews;
exports.fetchWeatherPromise = fetchWeatherPromise;
exports.fetchNewsPromise = fetchNewsPromise;
exports.getWeatherDescription = getWeatherDescription;
const node_https_1 = __importDefault(require("node:https"));
const newsUrl = "https://dummyjson.com/posts?limit=5";
const geocodingUrl = "https://geocoding-api.open-meteo.com/v1/search";
function searchCity(city, callback) {
    const url = `${geocodingUrl}?name=${encodeURIComponent(city)}&count=1`;
    node_https_1.default.get(url, (response) => {
        let data = "";
        response.on("data", (chunk) => {
            data += chunk;
        });
        response.on("end", () => {
            try {
                const result = JSON.parse(data);
                if (!result.results || result.results.length === 0) {
                    callback(new Error("City not found"));
                    return;
                }
                const location = {
                    name: result.results[0].name,
                    latitude: result.results[0].latitude,
                    longitude: result.results[0].longitude
                };
                callback(null, location);
            }
            catch (_a) {
                callback(new Error("Could not parse city data"));
            }
        });
    }).on("error", (error) => {
        callback(error);
    });
}
function fetchWeather(latitude, longitude, callback) {
    const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}` +
        `&longitude=${longitude}` +
        `&current=temperature_2m,wind_speed_10m,weather_code`;
    node_https_1.default.get(weatherUrl, (response) => {
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
function fetchNews(callback) {
    node_https_1.default.get(newsUrl, (response) => {
        let data = "";
        response.on("data", (chunk) => {
            data += chunk;
        });
        response.on("end", () => {
            try {
                const news = JSON.parse(data);
                callback(null, news);
            }
            catch (_a) {
                callback(new Error("Could not parse news data"));
            }
        });
    }).on("error", (error) => {
        callback(error);
    });
}
function request(url) {
    return new Promise((resolve, reject) => {
        node_https_1.default.get(url, (response) => {
            let data = "";
            response.on("data", (chunk) => {
                data += chunk;
            });
            response.on("end", () => {
                try {
                    const result = JSON.parse(data);
                    resolve(result);
                }
                catch (_a) {
                    reject(new Error("Could not parse API response"));
                }
            });
        }).on("error", (error) => {
            reject(error);
        });
    });
}
function fetchWeatherPromise(latitude, longitude) {
    const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}` +
        `&longitude=${longitude}` +
        `&current=temperature_2m,wind_speed_10m,weather_code`;
    return request(weatherUrl);
}
function fetchNewsPromise() {
    return request(newsUrl);
}
function getWeatherDescription(weatherCode) {
    switch (weatherCode) {
        case 0:
            return "Clear sky";
        case 1:
            return "Mainly clear";
        case 2:
            return "Partly cloudy";
        case 3:
            return "Overcast";
        case 45:
        case 48:
            return "Fog";
        case 51:
        case 53:
        case 55:
            return "Drizzle";
        case 56:
        case 57:
            return "Freezing drizzle";
        case 61:
        case 63:
        case 65:
            return "Rain";
        case 66:
        case 67:
            return "Freezing rain";
        case 71:
        case 73:
        case 75:
            return "Snow";
        case 77:
            return "Snow grains";
        case 80:
        case 81:
        case 82:
            return "Rain showers";
        case 85:
        case 86:
            return "Snow showers";
        case 95:
            return "Thunderstorm";
        case 96:
        case 99:
            return "Thunderstorm with hail";
        default:
            return "Unknown weather";
    }
}
