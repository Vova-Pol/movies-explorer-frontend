import React, { useState } from 'react';
import './Profile.css';
import { useContext, FC } from 'react';
import Header from '../../components/Header/Header';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { FiEdit3, FiSettings } from 'react-icons/fi';
import { EditProfilePopup } from '../../components/EdirProfilePopup/EditProfilePopup';
import { IUpdateUserProfileFormValues } from '../../types/user';
import { countUserAge } from '../../utils/utils';
import { EditUsernamePopup } from '../../components/EditUsernamePopup/EditUsernamePopup';
const defaultAvatar = require('../../images/default-avatar.jpeg');

interface IProfileProps {
  onUpdateUserProfile: (values: IUpdateUserProfileFormValues) => void;
  loggedIn: boolean;
  isUpdateSuccess: boolean;
  onLogout: () => void;
}

const Profile: FC<IProfileProps> = ({
  onLogout,
  onUpdateUserProfile,
  loggedIn,
  isUpdateSuccess,
}) => {
  const currentUser = useContext(CurrentUserContext);

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isEditUsernamePopupOpen, setIsEditUsernamePopupOpen] = useState(false);

  function onEditProfilePopupOpen() {
    setIsEditProfilePopupOpen(true);
  }

  function onEditProfilePopupClose() {
    setIsEditProfilePopupOpen(false);
  }

  function onEditUsernamePopupOpen() {
    setIsEditUsernamePopupOpen(true);
  }

  function onEditUsernamePopupClose() {
    setIsEditUsernamePopupOpen(false);
  }

  const userFullName =
    currentUser.firstName && currentUser.lastName
      ? `${currentUser.firstName} ${currentUser.lastName}`
      : 'Unnamed';

  const userAge = currentUser.dateOfBirth
    ? countUserAge(currentUser.dateOfBirth)
    : '-';

  return (
    <div className="profile">
      <Header loggedIn={loggedIn} />
      <main>
        <div className="profile__container">
          <img className="profile__avatar" src={defaultAvatar}></img>
          <div className="profile__info-container">
            <div className="profile__title-container">
              <h1 className="profile__title">{userFullName}</h1>
              <FiSettings
                className="profile__edit-profile-icon"
                onClick={onEditProfilePopupOpen}
              />
            </div>
            <div className="profile__username-container">
              <span className="profile__username">@{currentUser.username}</span>
              <FiEdit3
                className="profile__edit-username-icon"
                onClick={onEditUsernamePopupOpen}
              />
            </div>
            <div className="profile__field-container">
              <p className="profile__field-title">E-mail</p>
              <p className="profile__field-value">{currentUser.email}</p>
            </div>
            <div className="profile__line"></div>
            <div className="profile__field-container">
              <p className="profile__field-title">Возраст</p>
              <p className="profile__field-value">{userAge}</p>
            </div>
            <div className="profile__line"></div>
            <div className="profile__field-container">
              <p className="profile__field-title">Любимые жарны</p>
              <ul className="profile__field-value profile__genres-list">
                {currentUser.favouriteGenres.map((fav) => (
                  <li className="profile__genre" key={fav}>
                    {fav}
                  </li>
                ))}
              </ul>
            </div>
            <div className="profile__line"></div>
            <span
              className={
                isUpdateSuccess
                  ? 'profile__success-text profile__success-text_type_active'
                  : 'profile__success-text'
              }
            >
              Изменения внесены &#10003;
            </span>
            <button
              type="button"
              className="profile__exit-button"
              onClick={onLogout}
            >
              Выйти из аккаунта
            </button>
          </div>
        </div>
        {isEditProfilePopupOpen && (
          <EditProfilePopup
            onUpdateUserProfile={onUpdateUserProfile}
            isUpdateSuccess={isUpdateSuccess}
            onClose={onEditProfilePopupClose}
          />
        )}

        {isEditUsernamePopupOpen && <EditUsernamePopup />}
      </main>
    </div>
  );
};

export default Profile;
