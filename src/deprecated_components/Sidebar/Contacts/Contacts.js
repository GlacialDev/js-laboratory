import React from "react";
import "./Contacts.css";

function Contacts() {
  return (
    <div className="Contacts">
      <div className="form-links-container">
        <a className="form-link " href="https://github.com/Glacialix">
          github
        </a>
        <a className="form-link" href="https://vk.com/kleverion">
          vk
        </a>
      </div>
      <span className="text-element">
        Форма для отправки сообщения мне на электронную почту:
      </span>
      <form className="form">
        <input className="form-field" type="email" placeholder="Ваш e-mail" />
        <input
          className="form-field"
          type="text"
          placeholder="Тема сообщения"
        />
        <textarea
          className="form-field form-textarea"
          placeholder="Краткое описание проекта"
        />
        <button className="form-submit" type="button">
          Отправить
        </button>
      </form>
    </div>
  );
}

export default Contacts;
