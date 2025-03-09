import axios from "axios";

const API_KEY = '4bf2120c57e16767ae7bcba262afdc0c'; // Secure API Key
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

/**
 * Fetches weather data based on latitude and longitude.
 * @param {number} lat - Latitude.
 * @param {number} lon - Longitude.
 * @returns {Promise<Object>} - Weather data.
 */
export const getWeather = async (lat, lon) => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        lat,
        lon,
        units: "imperial", // Fahrenheit
        appid: API_KEY,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching weather:", error);
    return null;
  }
};
