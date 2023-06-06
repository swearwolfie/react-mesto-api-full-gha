import React, { useState, useEffect } from "react";
import "../index.css";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";


function Main({ onEditProfile, onAddPlace, onEditAvatar, onCardClick, cardSet, onCardLike, onCardDelete }) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <img
          src={currentUser.avatar} //currentUser.avatar
          className="profile__photo"
          alt="аватар пользователя"
        />
        <button
          onClick={onEditAvatar}
          type="button"
          className="profile__photo-edit-button"
        ></button>
        <div className="profile__container">
          <h1 className="profile__name">{currentUser.name}</h1>
          <button
            onClick={onEditProfile}
            className="profile__edit-button"
            type="button"
            aria-label="редактировать"
          ></button>
          <p className="profile__description">{currentUser.about}</p>
        </div>
        <button
          onClick={onAddPlace}
          className="profile__add-button"
          type="button"
          aria-label="добавить"
        ></button>
      </section>
      <section className="cards">
        {cardSet.map((card) => (
          <Card
            key={card._id}
            card={card}
            onCardClick={onCardClick}
            onCardLike={onCardLike}
            onCardDelete={onCardDelete}
          />
        ))}
      </section>
    </main>
  );
}

export default Main;
