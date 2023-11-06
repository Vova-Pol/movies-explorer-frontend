import React, { ChangeEvent, FC, FormEvent, useContext } from 'react';
import './EditProfilePopup.css';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { useFormAndValidation } from '../../hooks/useFormAndValidation';
import { IUpdateUserProfileFormValues } from '../../types/user';
import {
  GENRES,
  MAX_BIRTH_DATE_VALUE,
  MIN_BIRTH_DATE_VALUE,
} from '../../utils/constants';
import { areArraysEqual } from '../../utils/utils';

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
  const initialValues = {
    firstName: currentUser.firstName,
    lastName: currentUser.lastName,
    email: currentUser.email,
    dateOfBirth: currentUser.dateOfBirth,
    favouriteGenres: currentUser.favouriteGenres,
  };

  // -------------- Исправить баг добавления/удаления любимых жанров:
  // ['комедия', 'боевик'] почему-то не равны ['боевик', 'комедия']

  const {
    values,
    handleChange,
    setValues,
    errors,
    isValid,
    resetForm,
    setIsValuesChanged,
    isValuesChanged,
  } = useFormAndValidation<IUpdateUserProfileFormValues>(initialValues);

  function handleFavouriteGenreCheckbox(evt: ChangeEvent<HTMLInputElement>) {
    const { checked, value } = evt.target;
    const newValuesArray = Array.from(values.favouriteGenres);

    if (checked) {
      newValuesArray.push(value);
      setValues({
        ...values,
        favouriteGenres: newValuesArray,
      });
      console.log('В ините: ' + initialValues.favouriteGenres);
      console.log('Новый: ' + newValuesArray);
      setIsValuesChanged(
        !areArraysEqual(initialValues.favouriteGenres, newValuesArray),
      );
    } else {
      const filteredArray = newValuesArray.filter((el) => el != value);
      setValues({
        ...values,
        favouriteGenres: filteredArray,
      });
      console.log('В ините: ' + initialValues.favouriteGenres);
      console.log('Новый: ' + newValuesArray);
      setIsValuesChanged(
        !areArraysEqual(initialValues.favouriteGenres, filteredArray),
      );
    }
  }

  function handleSubmit(evt: FormEvent<HTMLFormElement>) {
    evt.preventDefault();
    onClose();
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
            value={values.dateOfBirth}
            onChange={handleChange}
            min={MIN_BIRTH_DATE_VALUE}
            max={MAX_BIRTH_DATE_VALUE}
          ></input>
        </div>
        <div className="edit-profile-popup__line"></div>
        <fieldset className="edit-profile-popup__fieldset">
          <legend className="edit-profile-popup__legend">Любимые жанры</legend>
          {GENRES.map((genre) => {
            return (
              <div
                className="edit-profile-popup__checkbox-container"
                key={genre}
              >
                <input
                  className="edit-profile-popup__input"
                  type="checkbox"
                  id={genre}
                  name="favouriteGenres"
                  value={genre}
                  onChange={handleFavouriteGenreCheckbox}
                  checked={values.favouriteGenres.includes(genre)}
                ></input>
                <label
                  className="edit-profile-popup__info-item"
                  htmlFor={genre}
                >
                  {genre}
                </label>
              </div>
            );
          })}
        </fieldset>
        <button
          type="submit"
          className="edit-profile-popup__edit-button"
          disabled={!isValid || !isValuesChanged}
        >
          Отправить
        </button>
        <span className="edit-profile-popup__close-button" onClick={onClose}>
          Закрыть
        </span>
      </form>
    </div>
  );
};
