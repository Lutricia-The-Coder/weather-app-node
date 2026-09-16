export interface CityLocation {
  name: string;
  latitude: number;
  longitude: number;
}
export interface WeatherData {
  latitude: number;
  longitude: number;

  current: {
    temperature_2m: number;
    wind_speed_10m: number;
    weather_code: number;
  };

  current_units: {
    temperature_2m: string;
    wind_speed_10m: string;
    weather_code: string;
  };
}

export interface NewsPost {
  id: number;
  title: string;
  body: string;
}

export interface NewsData {
  posts: NewsPost[];
  total: number;
  skip: number;
  limit: number;
}