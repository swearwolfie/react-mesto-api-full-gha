import React, { useState } from "react";
import "../index.css";
import "./Login.css";

function Login({ onSignIn }) {
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
    onSignIn({
      email: userEmail,
      password: userPassword,
    });
  }

  return (
    <div className="login">
      <h3 className="login__title">Вход</h3>
      <form className="login__form" onSubmit={handleSubmit} name="login-form">
        <input
          className="login__input"
          id="login-email-input"
          name="login-email"
          placeholder="Email"
          onChange={handleEmailInfo}
          type="email"
          minLength="2"
          maxLength="200"
          value={userEmail}
          required
        />
        <input
          className="login__input"
          id="login-password-input"
          name="login-password"
          placeholder="Пароль"
          onChange={handlePasswordInfo}
          type="password"
          minLength="6"
          maxLength="200"
          value={userPassword}
          required
        />
        <button className="login__submit" type="submit" value="Login">
          Войти
        </button>
      </form>
    </div>
  );
}

export default Login;
