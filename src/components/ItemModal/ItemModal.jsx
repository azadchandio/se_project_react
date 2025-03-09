import "./ItemModal.css";

function ItemModal({ isOpen, onClose, card }) {
  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__content modal__content_type_image">
        <button type="button" className="modal__close" onClick={onClose}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 6.58579L13.2929 1.29289L14.7071 2.70711L9.41421 8L14.7071 13.2929L13.2929 14.7071L8 9.41421L2.70711 14.7071L1.29289 13.2929L6.58579 8L1.29289 2.70711L2.70711 1.29289L8 6.58579Z" fill="white"/>
          </svg>
        </button>
        <img src={card.link} alt={card.name} className="modal__image" />
        <div className="modal__footer">
          <h2 className="modal__caption">{card.name}</h2>
          <p className="modal__weather">Weather: {card.weather}</p>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
