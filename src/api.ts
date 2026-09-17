import https from "node:https";
import { CityLocation, WeatherData, NewsData } from "./types";

const newsUrl = "https://dummyjson.com/posts?limit=5";
const geocodingUrl = "https://geocoding-api.open-meteo.com/v1/search";

export function searchCity(
  city: string,
  callback: (error: Error | null, data?: CityLocation) => void
): void {
  const url =
    `${geocodingUrl}?name=${encodeURIComponent(city)}&count=1`;

  https.get(url, (response) => {
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

        const location: CityLocation = {
          name: result.results[0].name,
          latitude: result.results[0].latitude,
          longitude: result.results[0].longitude
        };

        callback(null, location);

      } catch {
        callback(new Error("Could not parse city data"));
      }
    });
  }).on("error", (error) => {
    callback(error);
  });
}

export function fetchWeather(
  latitude: number,
  longitude: number,
  callback: (error: Error | null, data?: WeatherData) => void
): void {
  const weatherUrl =
    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}` +
    `&longitude=${longitude}` +
    `&current=temperature_2m,wind_speed_10m,weather_code`;

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
        callback(new Error("Could not parse weather data"));
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
export function fetchWeatherPromise(
  latitude: number,
  longitude: number
): Promise<WeatherData> {
  const weatherUrl =
    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}` +
    `&longitude=${longitude}` +
    `&current=temperature_2m,wind_speed_10m,weather_code`;

  return request<WeatherData>(weatherUrl);
}

export function fetchNewsPromise(): Promise<NewsData> {
  return request<NewsData>(newsUrl);
}
export function getWeatherDescription(
  weatherCode: number
): string {
  switch (weatherCode) {
    case 0:
      return "Clear sky";
    case 1:
      return "Mainly clear";
    case 2:
      return "Partly cloudy";
    case 3:
      return "Overcast";

    case 45: case 48:
      return "Fog";

    case 51: case 53: case 55:
      return "Drizzle";

    case 56: case 57:
      return "Freezing drizzle";

    case 61: case 63: case 65:
      return "Rain";

    case 66: case 67:
      return "Freezing rain";

    case 71: case 73: case 75:
      return "Snow";

    case 77:
      return "Snow grains";

    case 80: case 81: case 82:
      return "Rain showers";

    case 85: case 86:
      return "Snow showers";

    case 95:
      return "Thunderstorm";

    case 96:  case 99:
      return "Thunderstorm with hail";

    default:
      return "Unknown weather";
  }
}