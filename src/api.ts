import https from "node:https";
import { WeatherData, NewsData } from "./types";

const latitude = -23.9045;
const longitude = 29.4689;

const weatherUrl =
  `https://api.open-meteo.com/v1/forecast?latitude=${latitude}` +
  `&longitude=${longitude}` +
  `&current=temperature_2m,wind_speed_10m,weather_code`;

const newsUrl = "https://dummyjson.com/posts?limit=5";

export function fetchWeather(
  callback: (error: Error | null, data?: WeatherData) => void
): void {

  https.get(weatherUrl, (response) => {
    let data = "";

    response.on("data", (chunk) => {
      data += chunk;
    });

    response.on("end", () => {

      try {
        const weather = JSON.parse(data);
        callback(null, weather);

      } catch {
        callback( new Error("Could not parse weather data") );
  }

    });

  }).on("error", (error) => {
    callback(error);
  });
}

export function fetchNews(
  callback: (error: Error | null, data?: NewsData) => void
): void {

  https.get(newsUrl, (response) => {

    let data = "";

    response.on("data", (chunk) => {
      data += chunk;
    });

    response.on("end", () => {

      try {
        const news = JSON.parse(data);
        callback(null, news);

      } catch {
        callback(new Error("Could not parse news data") );
      }

    });

  }).on("error", (error) => {
    callback(error);
  });
}
function request<T>(url: string): Promise<T> {
  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      let data = "";

      response.on("data", (chunk) => {
        data += chunk;
      });

      response.on("end", () => {
        try {
          const result = JSON.parse(data) as T;
          resolve(result);
        } catch {
          reject(new Error("Could not parse API response"));
        }
      });
    }).on("error", (error) => {
      reject(error);
    });
  });
}

export function fetchWeatherPromise(): Promise<WeatherData> {
  return request<WeatherData>(weatherUrl);
}

export function fetchNewsPromise(): Promise<NewsData> {
  return request<NewsData>(newsUrl);
}