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

  useEffect(() => {
    apiThingie
      .getCards() // result - готовые данные
      .then((cards) => {
        setUploadedCards(cards);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    apiThingie
      .getProfileInfo()
      .then((profileUserInfo) => {
        setCurrentUser(profileUserInfo);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

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

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    apiThingie
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setUploadedCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
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
  function handleUpdateUser({ name, about }) {
    apiThingie
      .editProfile(name, about)
      .then((updateInfo) => {
        setCurrentUser(updateInfo);
        closeAllPopups();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleUpdateAvatar({ avatar }) {
    apiThingie
      .changeAvatar(avatar)
      .then((updateInfo) => {
        setCurrentUser(updateInfo);
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
        setUploadedCards([newCard, ...uploadedCards]);
        closeAllPopups();
      })
      .catch((error) => {
        console.log(error);
      });
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
        console.log(error);
      });
  }

  // проверка токена

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      checkToken(token)
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
  });

  function handleSignOut() {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    navigate("/signin");
  }

  return (
    <>
      <CurrentUserContext.Provider value={currentUser}>
        <Header userEmail={profileEmail} onSignOut={handleSignOut} />
        {/* шапка */}
        <Routes>
          <Route
            path="/signup"
            element={
              <>
                <Register onSignUp={handleSignUp} />
              </>
            }
          />
          <Route path="/signin" element={<Login onSignIn={handleSignIn} />} />

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
