import React, { useState, useEffect } from "react";
import "../index.css";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import apiThingie from "../utils/api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import InfoTooltip from "./InfoTooltip";
import { register, authorize, checkToken } from "../utils/MestoAuth";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  {
    /*  */
  }

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [uploadedCards, setUploadedCards] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isStatusSuccess, setIsStatusSuccess] = useState(false);
  const [isInfoToolOpen, setIsInfoToolOpen] = useState(false);
  const [profileEmail, setProfileEmail] = useState("");

  const navigate = useNavigate();

  // проверка токена

  /*
  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      checkToken(jwt)
        .then((data) => {
          if (data) {
            setIsLoggedIn(true);
            setProfileEmail(data.data.email);
            navigate("/");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      apiThingie
        .getCards() // result - готовые данные
        .then((cards) => {
          setUploadedCards(cards.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [isLoggedIn]);

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      apiThingie
        .getProfileInfo()
        .then((profileUserInfo) => {
          console.log(profileUserInfo, "salut");
          setCurrentUser(profileUserInfo.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [isLoggedIn]); */

  const jwt = localStorage.getItem("jwt");
  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      checkToken(jwt)
      .then((data) => {
        if (data) {
          setIsLoggedIn(true);
          setProfileEmail(data.data.email);
          apiThingie
          .getProfileInfo()
          .then((profileUserInfo) => {
            console.log(profileUserInfo, "salut");
            setCurrentUser(profileUserInfo.data);
          })
          .catch((error) => {
            console.log(error);
          });
          navigate("/");
        }
      })
      .catch((error) => {
        console.log(error)
      })
    }
  }, [isLoggedIn]);

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      checkToken(jwt)
      .then((data) => {
        if (data) {
          apiThingie
          .getCards() // result - готовые данные
          .then((cards) => {
            setUploadedCards(cards.data);
          })
          .catch((error) => {
            console.log(error);
          });
        }
      })
      .catch((error) => {
        console.log(error)
      })
    }
  }, [isLoggedIn]);

  // получаем массив карточек и инфу пользователя
/*
  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
    Promise.all([apiThingie.getProfileInfo(), apiThingie.getCards()])
      .then(([user, cards]) => {
        console.log(user, cards, 'i dont pretend to know the challenges were facing')
        setCurrentUser(user);
        setUploadedCards(cards);
      })
      .catch((err) => console.log(err));
    }
  }, [isLoggedIn]); */

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }
  function handleCardClick(card) {
    setIsImagePopupOpen(true);
    setSelectedCard(card);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsImagePopupOpen(false);
    setIsInfoToolOpen(false);
  }

  function handleSignUp({ email, password }) {
    register(email, password)
      .then((data) => {
        if (data) {
          setIsStatusSuccess(true); // если статус ок, выбираем картинку с галочкой
          navigate("/signin");
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => setIsInfoToolOpen(true)); // открываем один из попапов в зависимости от успехов
  }

  function handleSignIn({ email, password }) {
    authorize(email, password)
      .then((data) => {
        if (data) {
          console.log(data, email, "успех апи");
          setProfileEmail(email);
          localStorage.setItem("jwt", data.jwt);
          setIsLoggedIn(true);
          navigate("/");
        }
      })
      .catch((error) => {
        setIsStatusSuccess(false);
        setIsInfoToolOpen(true);
        console.log(error);
      });
  }

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    apiThingie
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        console.log(newCard.data, 'but i love being at your side')
        console.log(newCard, 'im just a sidekick im just a sidekick')
        setUploadedCards((state) => state.map((c) => (c._id === card._id ? newCard.data : c))
        );
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleCardDelete(card) {
    // отправляем запрос к апи
    apiThingie
      .deleteCard(card._id)
      .then(() => {
        setUploadedCards((state) => state.filter((c) => c._id !== card._id));
      })
      .catch((error) => {
        console.log(error);
      });
  }

  {
    /* сначала через вызов апи задаем информацию на сервере, потом задаем ее на самом сайте;  */
  }
  function handleUpdateUser(profileInfo) {
    console.log(profileInfo, 'stop wait a minute')
    apiThingie
      .editProfile(profileInfo)
      .then((updateInfo) => {
        console.log(updateInfo, "la la");
        setCurrentUser(updateInfo.data);
        closeAllPopups();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleUpdateAvatar(data) {
    console.log(data)
    apiThingie
      .changeAvatar(data.avatar)
      .then((updateInfo) => {
        console.log(updateInfo.data, "if i could breathe id be free");
        setCurrentUser(updateInfo.data);
        closeAllPopups();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleAddPlaceSubmit({ title, picture }) {
    apiThingie
      .addNewCard(title, picture)
      .then((newCard) => {
        setUploadedCards([newCard.data, ...uploadedCards]);
        closeAllPopups();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleSignOut() {
    setIsLoggedIn(false);
    localStorage.removeItem("jwt");
    setProfileEmail("");
  }

  return (
    <>
      <CurrentUserContext.Provider value={currentUser}>
        <Header userEmail={profileEmail} onSignOut={handleSignOut} />
        {/* шапка */}
        <Routes>
          <Route
            exact
            path="/"
            element={<ProtectedRoute isLoggedIn={isLoggedIn} />}
          >
            <Route
              exact
              path="/"
              element={
                <>
                  <Main
                    onEditProfile={handleEditProfileClick}
                    onAddPlace={handleAddPlaceClick}
                    onEditAvatar={handleEditAvatarClick}
                    onCardClick={handleCardClick}
                    cardSet={uploadedCards}
                    onCardLike={handleCardLike}
                    onCardDelete={handleCardDelete}
                  />{" "}
                  <Footer />{" "}
                </>
              }
            />
          </Route>
          <Route
            path="/signup"
            element={
              <>
                <Register onSignUp={handleSignUp} />
              </>
            }
          />
          <Route path="/signin" element={<Login onSignIn={handleSignIn} />} />
        </Routes>
        <InfoTooltip
          isOpen={isInfoToolOpen}
          onClose={closeAllPopups}
          isSuccess={isStatusSuccess}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <PopupWithForm
          popupName="popup_make-sure"
          title="Вы уверены?"
          buttonName="Да"
        />
        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
          isOpen={isImagePopupOpen}
        />
      </CurrentUserContext.Provider>
    </>
  );
}

export default App;
