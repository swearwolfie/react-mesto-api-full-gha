import React from "react";
import "../index.css";

function ImagePopup({ card, onClose, isOpen }) {
  return (
    <div className={`popup popup_pic ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container">
        <button
          className="popup__close-icon popup__close-icon_pic"
          type="button"
          aria-label="закрыть"
          onClick={onClose}
        ></button>
        <img className="popup__image" src={card.cardPic} alt={card.cardTitle} />
        <h2 className="popup__description">{card.cardTitle}</h2>
      </div>
    </div>
  );
}

export default ImagePopup;
