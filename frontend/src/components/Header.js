import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import "../index.css";

function Header({ userEmail, onSignOut }) {
  return (
    <header className="header">
      <div className="header__logo"></div>
      <Routes>
        <Route
          path="/signup"
          element={
            <Link to="/signin" className="header__link">
              Войти
            </Link>
          }
        />
        <Route
          path="/signin"
          element={
            <Link to="/signup" className="header__link">
              Регистрация
            </Link>
          }
        />
        <Route
          path="/"
          element={
            <>
              <h4 className="header__email">
                {" "}
                {userEmail}
                <button className="header__link" onClick={onSignOut}>
                  Выйти
                </button>
              </h4>
            </>
          }
        />
      </Routes>
    </header>
  );
}

export default Header;
