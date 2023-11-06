import React, { FC, FormEvent, useContext } from 'react';
import './EditUsernamePopup.css';
import { IUpdateUsernameFormValues } from '../../types/user';
import { useFormAndValidation } from '../../hooks/useFormAndValidation';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

interface IEditUsernamePopupProps {
  onUpdateUserProfile: (values: IUpdateUsernameFormValues) => void;
  onClose: () => void;
  isUpdateSuccess: boolean;
}

export const EditUsernamePopup: FC<IEditUsernamePopupProps> = ({
  onClose,
  onUpdateUserProfile,
  isUpdateSuccess,
}) => {
  const currentUser = useContext(CurrentUserContext);

  const initialValues = {
    username: currentUser.username,
    password: '',
  };

  const {
    values,
    handleChange,
    setValues,
    errors,
    isValid,
    resetForm,
    setIsValuesChanged,
    isValuesChanged,
  } = useFormAndValidation<IUpdateUsernameFormValues>(initialValues);

  function handleSubmit(evt: FormEvent<HTMLFormElement>) {
    evt.preventDefault();
    onClose();
    onUpdateUserProfile(values);
  }

  return (
    <div className="edit-username-popup">
      <form className="edit-username-popup__form" onSubmit={handleSubmit}>
        <p className="edit-username-popup__title">Редактировать @username</p>
        <div className="edit-username-popup__field-container">
          <label className="edit-username-popup__info-item">Username</label>
          <input
            className="edit-username-popup__input"
            type="text"
            name="username"
            required
            minLength={2}
            value={values.username}
            placeholder="@username"
            onChange={handleChange}
          ></input>
        </div>
        <div className="edit-username-popup__line"></div>
        <div className="edit-username-popup__field-container">
          <label className="edit-username-popup__info-item">Пароль</label>
          <input
            className="edit-username-popup__input"
            type="password"
            name="password"
            required
            minLength={2}
            value={values.password}
            placeholder="Пароль"
            onChange={handleChange}
          ></input>
        </div>
        <button
          type="submit"
          className="edit-username-popup__edit-button"
          disabled={!isValid || !isValuesChanged}
        >
          Отправить
        </button>
        <span className="edit-username-popup__close-button" onClick={onClose}>
          Закрыть
        </span>
      </form>
    </div>
  );
};
