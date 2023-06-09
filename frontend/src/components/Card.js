import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  {
    /**/
  }
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = card.owner === currentUser._id;
  const isLiked = card.likes.some(i => i === currentUser._id);  
  const cardLikeButtonClassName = `cards__like-button ${
    isLiked && 'cards__like-button_active'
  }`;
  const handleCardClick = () => {
    const cardPic = card.link;
    const cardTitle = card.name;
    onCardClick({ cardPic, cardTitle });
  };

  const handleLikeClick = () => {
    onCardLike(card);
  };

  const handleDeleteClick = () => {
    onCardDelete(card);
  };

  return (
    <div className="cards__item cards__item_template">
      {isOwn && (
        <button className="cards__bin" onClick={handleDeleteClick}>
          {" "}
        </button>
      )}
      <img
        className="cards__pic"
        src={card.link}
        alt={card.name}
        onClick={handleCardClick}
      />
      <div className="cards__info">
        <h2 className="cards__name">{card.name}</h2>
        <div className="cards__likes-container">
          <button
            className={cardLikeButtonClassName}
            type="button"
            onClick={handleLikeClick}
          ></button>
          <span className="cards__likes-number">{card.likes.length}</span>
        </div>
      </div>
    </div>
  );
}

export default Card;
