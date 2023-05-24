import React, { useState } from "react";
import "../index.css";
import "./Register.css";
import { Link } from "react-router-dom";

function Register({ onSignUp }) {
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");

  function handleEmailInfo(e) {
    setUserEmail(e.target.value);
  }

  function handlePasswordInfo(e) {
    setUserPassword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    onSignUp({
      email: userEmail,
      password: userPassword,
    });
  }

  return (
    <div className="register">
      <h3 className="register__title">Регистрация</h3>
      <form
        className="register__form"
        onSubmit={handleSubmit}
        name="register-form"
      >
        <input
          className="register__input"
          id="register-email-input"
          name="register-email"
          placeholder="Email"
          onChange={handleEmailInfo}
          type="email"
          value={userEmail}
          minLength="2"
          maxLength="200"
          required
        />
        <input
          className="register__input"
          id="register-password-input"
          name="register-password"
          placeholder="Пароль"
          onChange={handlePasswordInfo}
          type="password"
          value={userPassword}
          minLength="6"
          maxLength="200"
          required
        />
        <button className="register__submit" type="submit" value="Register">
          Зарегистрироваться
        </button>
      </form>
      <h4 className="register__confirm">
        Уже зарегистрированы?{" "}
        <Link to="/signin" className="register__confirm register__confirm_link">
          Войти
        </Link>
      </h4>
    </div>
  );
}

export default Register;
