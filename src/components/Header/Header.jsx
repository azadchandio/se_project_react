import { useState, useEffect } from "react";
import "./Header.css";
import logo from "../../assets/logo.svg";
import avatar from "../../assets/avatar.svg";

function Header({ handleAddClick, city, isLoading }) {
  const [date, setDate] = useState("");

  // Format Date (e.g., "June 15")
  useEffect(() => {
    const options = { month: "long", day: "numeric" };
    setDate(new Date().toLocaleDateString("en-US", options));
  }, []);

  const displayLocation = isLoading 
    ? "Loading..." 
    : (city || "Unknown Location");

  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="logo" />
      <p className="header__date-location">
        {`${date}, ${displayLocation}`}
      </p>
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
