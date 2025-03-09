import { useState, useEffect } from "react";
import "./Header.css";
import logo from "../../assets/logo.svg";
import avatar from "../../assets/avatar.svg";

function Header({ handleAddClick }) {
  const [location, setLocation] = useState("Fetching location...");
  const [date, setDate] = useState("");

  // Format Date (e.g., "June 15")
  useEffect(() => {
    const options = { month: "long", day: "numeric" };
    setDate(new Date().toLocaleDateString("en-US", options));
  }, []);

  // Fetch Location
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
            );
            const data = await response.json();
            setLocation(data.address.city || data.address.town || "Unknown Location");
          } catch (error) {
            setLocation("Unable to fetch location");
          }
        },
        () => {
          setLocation("Location access denied");
        }
      );
    } else {
      setLocation("Geolocation not supported");
    }
  }, []);

  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="logo" />
      <p className="header__date-location">{`${date}, ${location}`}</p>
      <button
        onClick={handleAddClick}
        type="button"
        className="header__add-clothes-btn"
      >
        + Add Clothes
      </button>
      <div className="header__user-container">
        <p className="header__username">Terrence Tegegine</p>
        <img src={avatar} alt="Terrence Tegegine" className="header__avatar" />
      </div>
    </header>
  );
}

export default Header;
