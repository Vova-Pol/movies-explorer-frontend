import React, { ChangeEvent, FC, FormEvent, useContext } from 'react';
import './EditProfilePopup.css';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { useFormAndValidation } from '../../hooks/useFormAndValidation';
import { Genre, IUpdateUserProfileFormValues } from '../../types/user';
import {
  MAX_BIRTH_DATE_VALUE,
  MIN_BIRTH_DATE_VALUE,
} from '../../utils/constants';

interface IEditProfilePopupProps {
  onUpdateUserProfile: (values: IUpdateUserProfileFormValues) => void;
  onClose: () => void;
  isUpdateSuccess: boolean;
}

export const EditProfilePopup: FC<IEditProfilePopupProps> = ({
  onUpdateUserProfile,
  isUpdateSuccess,
  onClose,
}) => {
  const currentUser = useContext(CurrentUserContext);

  const { values, handleChange, setValues, errors, isValid, resetForm } =
    useFormAndValidation<IUpdateUserProfileFormValues>(currentUser);

  const valuesChanged =
    values.email !== currentUser.email ||
    values.firstName !== currentUser.firstName ||
    values.lastName !== currentUser.lastName ||
    values.dateOfBirth !== currentUser.dateOfBirth ||
    values.favouriteGenres !== currentUser.favouriteGenres;

  function handleFavouriteGenreCheckbox(evt: ChangeEvent<HTMLInputElement>) {
    const checked = evt.target.checked;
    const value = evt.target.value;

    if (checked) {
      values.favouriteGenres.push(value);
    } else {
      values.favouriteGenres.filter((el) => el != value);
    }
    console.log(values.favouriteGenres);
  }

  function handleSubmit(evt: FormEvent<HTMLFormElement>) {
    evt.preventDefault();
    onUpdateUserProfile(values);
  }

  return (
    <div className="edit-profile-popup">
      <form className="edit-profile-popup__form" onSubmit={handleSubmit}>
        <p className="edit-profile-popup__title">Редактировать профиль</p>
        <div className="edit-profile-popup__field-container">
          <label className="edit-profile-popup__info-item">Имя</label>
          <input
            className="edit-profile-popup__input"
            type="text"
            name="firstName"
            required
            minLength={2}
            value={values.firstName}
            placeholder="Имя"
            onChange={handleChange}
          ></input>
        </div>
        <div className="edit-profile-popup__line"></div>
        <div className="edit-profile-popup__field-container">
          <label className="edit-profile-popup__info-item">Фамилия</label>
          <input
            className="edit-profile-popup__input"
            type="text"
            name="lastName"
            required
            minLength={2}
            value={values.lastName}
            placeholder="Фамилия"
            onChange={handleChange}
          ></input>
        </div>
        <div className="edit-profile-popup__line"></div>
        <div className="edit-profile-popup__field-container">
          <label className="edit-profile-popup__info-item">E-mail</label>
          <input
            className="edit-profile-popup__input"
            type="email"
            name="email"
            required
            value={values.email}
            placeholder="Почта"
            onChange={handleChange}
          ></input>
        </div>
        <div className="edit-profile-popup__line"></div>
        <div className="edit-profile-popup__field-container">
          <label className="edit-profile-popup__info-item">Дата Рождения</label>
          <input
            className="edit-profile-popup__input"
            type="date"
            name="dateOfBirth"
            required
            value={currentUser.dateOfBirth}
            onChange={handleChange}
            min={MIN_BIRTH_DATE_VALUE}
            max={MAX_BIRTH_DATE_VALUE}
          ></input>
        </div>
        <div className="edit-profile-popup__line"></div>
        <fieldset className="edit-profile-popup__fieldset">
          <legend className="edit-profile-popup__legend">Любимые жанры</legend>
          {Object.values(Genre).map((genreValue) => {
            return (
              <div
                className="edit-profile-popup__checkbox-container"
                key={genreValue}
              >
                <input
                  className="edit-profile-popup__input"
                  type="checkbox"
                  id={genreValue}
                  name="favouriteGenres"
                  value={genreValue}
                  onChange={handleFavouriteGenreCheckbox}
                  checked={values.favouriteGenres.some(
                    (val) => val === genreValue,
                  )}
                ></input>
                <label
                  className="edit-profile-popup__info-item"
                  htmlFor={genreValue}
                >
                  {genreValue}
                </label>
              </div>
            );
          })}
        </fieldset>
        <span
          className={
            isUpdateSuccess
              ? 'edit-profile-popup__success-text edit-profile-popup__success-text_type_active'
              : 'edit-profile-popup__success-text'
          }
        >
          Изменения внесены &#10003;
        </span>
        <button
          type="submit"
          className="edit-profile-popup__edit-button"
          disabled={!isValid && !valuesChanged}
        >
          Редактировать
        </button>
        <span className="edit-profile-popup__close-button" onClick={onClose}>
          Закрыть
        </span>
      </form>
    </div>
  );
};
