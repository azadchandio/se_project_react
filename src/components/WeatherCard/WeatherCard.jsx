import { useEffect, useState } from "react";
import "./WeatherCard.css";
import { getWeather } from "../../utils/weatherApi";
import sunnyDay from "../../assets/sunny-day.svg";
import sunnyNight from "../../assets/sunny-night.svg";
import cloudyDay from "../../assets/cloudy-day.svg";
import cloudyNight from "../../assets/cloudy-night.svg";
import rainDay from "../../assets/rain-day.svg";
import rainNight from "../../assets/rain-night.svg";
import stormDay from "../../assets/storm-day.svg";
import stormNight from "../../assets/storm-night.svg";
import snowDay from "../../assets/snow-day.svg";
import snowNight from "../../assets/snow-night.svg";
import fogDay from "../../assets/fog-day.svg";
import fogNight from "../../assets/fog-night.svg";

function WeatherCard() {
  const [temperature, setTemperature] = useState(null);
  const [weatherIcon, setWeatherIcon] = useState(sunnyDay);
  const [city, setCity] = useState("");

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        const weatherData = await getWeather(latitude, longitude);

        if (weatherData) {
          setTemperature(Math.round(weatherData.main.temp));
          setCity(weatherData.name);

          const isNight =
            weatherData.dt < weatherData.sys.sunrise ||
            weatherData.dt > weatherData.sys.sunset;

          // Set weather icon based on condition & time of day
          switch (weatherData.weather[0].main) {
            case "Clear":
              setWeatherIcon(isNight ? sunnyNight : sunnyDay);
              break;
            case "Clouds":
              setWeatherIcon(isNight ? cloudyNight : cloudyDay);
              break;
            case "Rain":
            case "Drizzle":
              setWeatherIcon(isNight ? rainNight : rainDay);
              break;
            case "Thunderstorm":
              setWeatherIcon(isNight ? stormNight : stormDay);
              break;
            case "Snow":
              setWeatherIcon(isNight ? snowNight : snowDay);
              break;
            case "Fog":
            case "Mist":
            case "Haze":
              setWeatherIcon(isNight ? fogNight : fogDay);
              break;
            default:
              setWeatherIcon(isNight ? cloudyNight : cloudyDay);
          }
        }
      },
      (error) => {
        console.error("Error getting location:", error);
      }
    );
  }, []);

  return (
    <section className="weather-card">
      {temperature !== null ? (
        <>
          <p className="weather-card__temp">{temperature} &deg;F</p>
          <img src={weatherIcon} alt="Weather icon" className="weather-card__image" />
        </>
      ) : (
        <p>Loading weather...</p>
      )}
    </section>
  );
}

export default WeatherCard;
