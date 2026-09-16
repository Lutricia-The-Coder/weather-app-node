"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchWeather = fetchWeather;
exports.fetchNews = fetchNews;
exports.fetchWeatherPromise = fetchWeatherPromise;
exports.fetchNewsPromise = fetchNewsPromise;
const node_https_1 = __importDefault(require("node:https"));
const latitude = -23.9045;
const longitude = 29.4689;
const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}` +
    `&longitude=${longitude}` +
    `&current=temperature_2m,wind_speed_10m,weather_code`;
const newsUrl = "https://dummyjson.com/posts?limit=5";
function fetchWeather(callback) {
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
function fetchWeatherPromise() {
    return request(weatherUrl);
}
function fetchNewsPromise() {
    return request(newsUrl);
}
