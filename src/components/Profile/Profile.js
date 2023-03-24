import './Profile.css';
import { useState, useContext, useEffect } from 'react';
import Header from '../Header/Header';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { useFormAndValidation } from '../../hooks/useFormAndValidation';

function Profile(props) {
  const currentUser = useContext(CurrentUserContext);

  const { values, handleChange, setValues, errors, isValid, resetForm } =
    useFormAndValidation({
      name: currentUser.name,
      email: currentUser.email,
    });

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onUpdateUserInfo(values);
  }

  return (
    <div className="profile">
      <Header loggedIn={props.loggedIn} />
      <main>
        <div className="profile__container">
          <h1 className="profile__title">{`Привет, ${currentUser.name}!`}</h1>
          <form className="profile__form" onSubmit={handleSubmit}>
            <div className="profile__info-container">
              <label className="profile__info-item">Имя</label>
              <input
                className="profile__input"
                type="text"
                name="name"
                required
                minLength="2"
                value={values.name}
                placeholder="Имя"
                onChange={handleChange}
              ></input>
            </div>
            <div className="profile__line"></div>
            <div className="profile__info-container">
              <label className="profile__info-item">E-mail</label>
              <input
                className="profile__input"
                type="email"
                name="email"
                required
                value={values.email}
                placeholder="Почта"
                onChange={handleChange}
              ></input>
            </div>
            <span
              className={
                props.isUpdateSuccess
                  ? 'profile__success-text profile__success-text_type_active'
                  : 'profile__success-text'
              }
            >
              Изменения внесены &#10003;
            </span>
            <button
              type="submit"
              className="profile__edit-button"
              disabled={isValid ? false : true}
            >
              Редактировать
            </button>
          </form>
          <button
            type="button"
            className="profile__exit-button"
            onClick={props.onLogout}
          >
            Выйти из аккаунта
          </button>
        </div>
      </main>
    </div>
  );
}

export default Profile;
