import React, { useState } from 'react';
import './Profile.css';
import { useContext, FC } from 'react';
import Header from '../../components/Header/Header';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { IUpdateUserFormValues } from '../../types/user';
import { FiEdit3, FiSettings } from 'react-icons/fi';
import { EditProfilePopup } from '../../components/EdirProfilePopup/EditProfilePopup';
const defaultAvatar = require('../../images/default-avatar.jpeg');

interface IProfileProps {
  onUpdateUserInfo: (values: IUpdateUserFormValues) => void;
  loggedIn: boolean;
  isUpdateSuccess: boolean;
  onLogout: () => void;
}

const Profile: FC<IProfileProps> = ({
  onLogout,
  onUpdateUserInfo,
  loggedIn,
  isUpdateSuccess,
}) => {
  const currentUser = useContext(CurrentUserContext);

  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);

  function onEditPopupOpen() {
    setIsEditPopupOpen(true);
  }

  function onEditPopupClose() {
    setIsEditPopupOpen(false);
  }

  const favoutites = ['комедия', 'документальный', 'боевик', 'детектив'];

  return (
    <div className="profile">
      <Header loggedIn={loggedIn} />
      <main>
        <div className="profile__container">
          <img className="profile__avatar" src={defaultAvatar}></img>
          <div className="profile__info-container">
            <div className="profile__title-container">
              <h1 className="profile__title">Владимир Иванов</h1>
              <FiSettings
                className="profile__edit-profile-icon"
                onClick={onEditPopupOpen}
              />
            </div>
            <div className="profile__username-container">
              <span className="profile__username">@{currentUser.username}</span>
              <FiEdit3 className="profile__edit-username-icon" />
            </div>
            <div className="profile__field-container">
              <p className="profile__field-title">E-mail</p>
              <p className="profile__field-value">{currentUser.email}</p>
            </div>
            <div className="profile__line"></div>
            <div className="profile__field-container">
              <p className="profile__field-title">Возраст</p>
              <p className="profile__field-value">29</p>
            </div>
            <div className="profile__line"></div>
            <div className="profile__field-container">
              <p className="profile__field-title">Любимые жарны</p>
              <ul className="profile__field-value profile__genres-list">
                {favoutites.map((fav) => (
                  <li className="profile__genre">{fav}</li>
                ))}
              </ul>
            </div>
            <div className="profile__line"></div>
            <button
              type="button"
              className="profile__exit-button"
              onClick={onLogout}
            >
              Выйти из аккаунта
            </button>
          </div>
        </div>
        {isEditPopupOpen && (
          <EditProfilePopup
            onUpdateUserInfo={onUpdateUserInfo}
            isUpdateSuccess={isUpdateSuccess}
            onClose={onEditPopupClose}
          />
        )}
      </main>
    </div>
  );
};

export default Profile;
