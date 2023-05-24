import React, { useRef, useEffect } from "react";
import "../index.css";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const avatarRef = useRef("");

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
    console.log(avatarRef.current.value);
  }

  useEffect(() => {
    avatarRef.current.value = "";
  }, [isOpen]);

  return (
    <PopupWithForm
      onSubmit={handleSubmit}
      isOpen={isOpen}
      onClose={onClose}
      popupName="avatar"
      title="Обновить аватар"
      buttonName="Сохранить"
    >
      <>
        <input
          className="popup__input"
          id="url-input-avatar"
          name="avatar"
          placeholder="Ссылка на картинку"
          type="url"
          ref={avatarRef}
          required
        />
        <span className="popup__input-error url-input-avatar-error"></span>
      </>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
