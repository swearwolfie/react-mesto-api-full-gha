import React, { useState } from "react";
import "./InfoTooltip.css";
import "../index.css";

function InfoTooltip({ isOpen, onClose, isSuccess }) {
  return (
    <div className={`info-tool ${isOpen ? "info-tool_opened" : ""}`}>
      <div className="info-tool__container">
        <div className="info-tool__close-icon" onClick={onClose} type="button" aria-label="закрыть"></div>
        <div
          className={`info-tool__button ${
            isSuccess ? "info-tool__button_tick" : "info-tool__button_cross"
          }`}
        ></div>
        <h3 className="info-tool__title">
        {isSuccess
            ? "Вы успешно зарегистрировались!"
            : "Что-то пошло не так! Попробуйте еще раз."}
        </h3>
      </div>
    </div>
  );
}

export default InfoTooltip;
