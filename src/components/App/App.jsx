import { useState, useEffect } from "react";
import "./App.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Main from "../Main/Main";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import ItemModal from "../ItemModal/ItemModal";
import { getWeather } from "../../utils/weatherApi";

function App() {
  const [weatherData, setWeatherData] = useState({});
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchWeather = async (lat, lon) => {
      try {
        const data = await getWeather(lat, lon);

        if (data) {
          setWeatherData({
            temp: Math.round(data.main.temp),
            type: getWeatherType(data.main.temp),
            city: data.name,
          });
        }
      } catch (error) {
        console.error("Error fetching weather data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchWeather(latitude, longitude);
        },
        (error) => {
          console.error("Error getting user location:", error);
          setIsLoading(false);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
      setIsLoading(false);
    }
  }, []);

  const getWeatherType = (temp) => {
    if (temp >= 86) {
      return "hot";
    } else if (temp >= 59 && temp < 86) {
      return "warm";
    } else {
      return "cold";
    }
  };

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  return (
    <div className="page">
      <div className="page__content">
        <Header 
          handleAddClick={handleAddClick}

          city={weatherData.city}
          isLoading={isLoading}
        />
        {isLoading ? (
          <p>Loading weather data...</p>
        ) : (
          <Main weatherData={weatherData} handleCardClick={handleCardClick} />
        )}

      <Footer />
      </div>
      <ModalWithForm
        title="New garment"
        buttonText="Add garment"
        activeModal={activeModal}
        closeActiveModal={closeActiveModal}
      >
        <label htmlFor="name" className="modal__label">
          Name{" "}
          <input
            type="text"
            className="modal__input"
            id="name"
            placeholder="Name"
          />
        </label>
        <label htmlFor="imageurl" className="modal__label">
          Image{" "}
          <input
            type="text"
            className="modal__input"
            id="imageurl"
            placeholder="Image URL"
          />
        </label>
        <fieldset className="modal__radio-buttons">
          <legend className="modal__legend">Select the weather type</legend>
          <label htmlFor="hot" className="modal__label modal__label_type_radio">
            <input id="hot" name="weather" type="radio" className="modal__radio-input" /> Hot
          </label>
          <label
            htmlFor="warm"
            className="modal__label modal__label_type_radio"
          >
            <input id="warm" name="weather" type="radio" className="modal__radio-input" /> Warm
          </label>
          <label
            htmlFor="cold"
            className="modal__label modal__label_type_radio"
          >
            <input id="cold" name="weather" type="radio" className="modal__radio-input" /> Cold
          </label>
        </fieldset>
      </ModalWithForm>
      <ItemModal
        activeModal={activeModal}
        card={selectedCard}
        onClose={closeActiveModal}
      />

    </div>
    
  );
}

export default App;