import "./ItemCard.css";

function ItemCard({ item, onCardClick }) {
  return (
    <li className="cards__item">
      <img
        onClick={() => onCardClick(item)}
        src={item.link}
        alt={item.name}
        className="cards__image"
      />
      <p className="cards__name"><span>{item.name}</span></p>
      <p className="cards__weather">Weather: {item.weather}</p>
    </li>
  );
}

export default ItemCard;
