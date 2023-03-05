import './Profile.css';
import { useState } from 'react';
import Header from '../Header/Header';

function Profile() {
  const [loggedIn, setLoggedIn] = useState(true);
  return (
    <div className="profile">
      <Header loggedIn={loggedIn} />
      <div className="profile__container">
        <h1 className="profile__title">Привет, Виталий!</h1>
        <div className="profile__info-container">
          <p className="profile__info-item">Имя</p>
          <p className="profile__info-item">Виталий</p>
        </div>
        <div className="profile__line"></div>
        <div className="profile__info-container">
          <p className="profile__info-item">E-mail</p>
          <p className="profile__info-item">pochta@yandex.ru</p>
        </div>
        <button type="button" className="profile__edit-button">
          Редактировать
        </button>
        <button type="button" className="profile__exit-button">
          Выйти из аккаунта
        </button>
      </div>
    </div>
  );
}

export default Profile;
