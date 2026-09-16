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
