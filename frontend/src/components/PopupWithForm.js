import React from "react";
import "../index.css";

function PopupWithForm({
  onSubmit,
  isOpen,
  onClose,
  popupName,
  title,
  buttonName,
  children
}) {
  return (
    <div className={`popup popup_${popupName} ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container">
        <button
          onClick={onClose}
          className="popup__close-icon popup__close-icon_add"
          type="button"
          aria-label="закрыть"
        ></button>
        <form className="popup__form" name={`form_${popupName}`} onSubmit={onSubmit}>
          <h2 className="popup__edit">{title}</h2>
          {children}
          <button className="popup__submit" type="submit" value="Save">
            {buttonName}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
