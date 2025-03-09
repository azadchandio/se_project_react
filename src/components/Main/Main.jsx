import "./Main.css";
import WeatherCard from "../WeatherCard/WeatherCard";
import { defaultClothingItems } from "../../utils/constants";
import ItemCard from "../ItemCard/ItemCard";

function Main({ weatherData, handleCardClick, isLoading }) {
  const temperature = weatherData?.main?.temp;
  
  return (
    <main>
      <WeatherCard weatherData={weatherData} isLoading={isLoading} />
      <section className="cards">
        <p className="cards__text">
          Today is {temperature ? `${Math.round(temperature)} °F` : "..."} / You may want to wear:
        </p>
        <ul className="cards__list">
          {defaultClothingItems
            .filter((item) => item.weather === weatherData.type)
            .map((item) => (
              <ItemCard
                key={item._id}
                item={item}
                onCardClick={handleCardClick}
              />
            ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
