// src/app/countries/models/weather.model.ts

export interface WeatherCondition {
    id: number;
    main: string;
    description: string;
    icon: string;
}

export interface MainWeather {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
}

export interface Wind {
    speed: number;
    deg: number;
}

export interface Coordinates {
    lon: number;
    lat: number;
}

export interface Weather {
    coord: Coordinates;
    weather: WeatherCondition[];  // ✅ Tableau, pas tuple
    main: MainWeather;
    wind: Wind;
    name: string;
}