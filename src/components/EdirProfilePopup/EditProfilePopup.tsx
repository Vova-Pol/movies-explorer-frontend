import React, { FC, FormEvent } from 'react';
import './EditProfilePopup.css';
import { useContext } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { useFormAndValidation } from '../../hooks/useFormAndValidation';
import { IUpdateUserFormValues } from '../../types/user';

interface IEditProfilePopupProps {
  onUpdateUserInfo: (values: IUpdateUserFormValues) => void;
  onClose: () => void;
  isUpdateSuccess: boolean;
}

export const EditProfilePopup: FC<IEditProfilePopupProps> = ({
  onUpdateUserInfo,
  isUpdateSuccess,
  onClose,
}) => {
  const currentUser = useContext(CurrentUserContext);

  const { values, handleChange, setValues, errors, isValid, resetForm } =
    useFormAndValidation<IUpdateUserFormValues>(currentUser);

  const valuesChanged =
    values.username !== currentUser!.username ||
    values.email !== currentUser!.email;

  function handleSubmit(evt: FormEvent<HTMLFormElement>) {
    evt.preventDefault();
    onUpdateUserInfo(values);
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
            name="username"
            required
            minLength={2}
            value="Владимир Пол"
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
            name="username"
            required
            minLength={2}
            value="Владимир Пол"
            placeholder="Имя"
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
          <label className="edit-profile-popup__info-item">Любимые жанры</label>
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
          disabled={isValid && valuesChanged ? false : true}
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
