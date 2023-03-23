import './Profile.css';
import { useState, useContext } from 'react';
import Header from '../Header/Header';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function Profile() {
  const [loggedIn, setLoggedIn] = useState(true);
  const currentUser = useContext(CurrentUserContext);
  return (
    <div className="profile">
      <Header loggedIn={loggedIn} />
      <main>
        <div className="profile__container">
          <h1 className="profile__title">{`Привет, ${currentUser.name}!`}</h1>
          <div className="profile__info-container">
            <p className="profile__info-item">Имя</p>
            <p className="profile__info-item">{currentUser.name}</p>
          </div>
          <div className="profile__line"></div>
          <div className="profile__info-container">
            <p className="profile__info-item">E-mail</p>
            <p className="profile__info-item">{currentUser.email}</p>
          </div>
          <button type="button" className="profile__edit-button">
            Редактировать
          </button>
          <button type="button" className="profile__exit-button">
            Выйти из аккаунта
          </button>
        </div>
      </main>
    </div>
  );
}

export default Profile;
