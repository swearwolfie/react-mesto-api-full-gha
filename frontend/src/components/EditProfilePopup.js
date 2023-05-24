import React, { useState, useEffect, useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import "../index.css";
import PopupWithForm from "./PopupWithForm";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  {
    /* const [value, setValue] = useState({ profileName, profileDesciption }); */
  }

  const [nickname, setNickame] = useState("");
  const [description, setDescription] = useState("");
  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    setNickame(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  function handleNameChange(e) {
    setNickame(e.target.value);
  }

  function handleDescriptionChage(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateUser({
      name: nickname,
      about: description,
    });
  }

  return (
    <PopupWithForm
      onSubmit={handleSubmit}
      isOpen={isOpen}
      onClose={onClose}
      popupName="edit"
      title="Редактировать профиль"
      buttonName="Сохранить"
    >
      <>
        <input
          type="text"
          className="popup__input popup__input_line_name"
          id="name-input"
          name="profile"
          required
          minLength="2"
          maxLength="40"
          value={nickname || ""}
          onChange={handleNameChange}
        />
        <span className="popup__input-error name-input-error"></span>
        <input
          type="text"
          className="popup__input popup__input_line_description"
          id="description-input"
          name="description"
          required
          minLength="2"
          maxLength="200"
          value={description || ""}
          onChange={handleDescriptionChage}
        />
        <span className="popup__input-error description-input-error"></span>
      </>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
