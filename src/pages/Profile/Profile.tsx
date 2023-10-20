import React, { FormEvent } from 'react';
import './Profile.css';
import { useContext, FC } from 'react';
import Header from '../../components/Header/Header';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { useFormAndValidation } from '../../hooks/useFormAndValidation';
import { IUpdateUserFormValues } from '../../types/user';

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
  const initialValues = currentUser
    ? {
        username: currentUser.username,
        email: currentUser.email,
      }
    : {
        username: '',
        email: '',
      };

  const { values, handleChange, setValues, errors, isValid, resetForm } =
    useFormAndValidation<IUpdateUserFormValues>(initialValues);

  const valuesChanged =
    values.username !== currentUser!.username ||
    values.email !== currentUser!.email;

  function handleSubmit(evt: FormEvent<HTMLFormElement>) {
    evt.preventDefault();
    onUpdateUserInfo(values);
  }

  return (
    <div className="profile">
      <Header loggedIn={loggedIn} />
      <main>
        <div className="profile__container">
          <h1 className="profile__title">Профайл</h1>
          <form className="profile__form" onSubmit={handleSubmit}>
            <div className="profile__info-container">
              <label className="profile__info-item">Имя</label>
              <input
                className="profile__input"
                type="text"
                name="username"
                required
                minLength={2}
                value={values.username}
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
                isUpdateSuccess
                  ? 'profile__success-text profile__success-text_type_active'
                  : 'profile__success-text'
              }
            >
              Изменения внесены &#10003;
            </span>
            <button
              type="submit"
              className="profile__edit-button"
              disabled={isValid && valuesChanged ? false : true}
            >
              Редактировать
            </button>
          </form>
          <button
            type="button"
            className="profile__exit-button"
            onClick={onLogout}
          >
            Выйти из аккаунта
          </button>
        </div>
      </main>
    </div>
  );
};

export default Profile;
