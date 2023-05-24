import React, { useState, useEffect, useRef } from "react";
import "../index.css";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const cardTitle = useRef("");
  const cardPic = useRef("");

  function handleSubmit(e) {
    e.preventDefault();

    onAddPlace({
      title: cardTitle.current.value,
      picture: cardPic.current.value,
    });
  }

  useEffect(() => {
    cardTitle.current.value = "";
    cardPic.current.value = "";
  }, [isOpen]);

  return (
    <PopupWithForm
      onSubmit={handleSubmit}
      isOpen={isOpen}
      onClose={onClose}
      popupName="add"
      title="Новое место"
      buttonName="Добавить"
    >
      <>
        <input
          type="text"
          className="popup__input popup__input_add_name"
          id="pic-name-input"
          name="title"
          placeholder="Название"
          ref={cardTitle}
          required
          minLength="2"
          maxLength="30"
        />
        <span className="popup__input-error pic-name-input-error"></span>
        <input
          className="popup__input popup__input_add_pic"
          id="url-input"
          name="picture"
          placeholder="Ссылка на картинку"
          ref={cardPic}
          type="url"
          required
        />
        <span className="popup__input-error url-input-error"></span>{" "}
      </>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
