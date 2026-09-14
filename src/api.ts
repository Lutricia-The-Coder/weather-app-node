import https from "node:https";

const latitude = -23.9045;
const longitude = 29.4689;

export function fetchWeather(
  callback: (error: Error | null, data?: any) => void
): void {

  const url =
    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}` +
    `&longitude=${longitude}` +
    `&current=temperature_2m,wind_speed_10m,weather_code`;

  https.get(url, (response) => {

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