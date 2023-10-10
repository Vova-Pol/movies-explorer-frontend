import React from 'react';
import '../../index.css';
import { FC } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import Login from '../../pages/Login/Login';
import Main from '../../pages/Main/Main';
import Movies from '../../pages/Movies/Movies';
import Register from '../../pages/Register/Register';
import SavedMovies from '../../pages/SavedMovies/SavedMovies';
import NotFound from '../NotFound/NotFound';
import Profile from '../../pages/Profile/Profile';
import { mainApi } from '../../utils/MainApi';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import ErrorPopup from '../ErrorPopup/ErrorPopup';
import { IRegisterFormValues, ILoginFormValues } from '../../types/auth';
import {
  REGISTER_PAGE_URL,
  LOGIN_PAGE_URL,
  MAIN_PAGE_URL,
  PROFILE_PAGE_URL,
  MOVIES_PAGE_URL,
  SAVED_MOVIES_PAGE_URL,
  NOT_FOUND_PAGE_URL,
  REGISTER_CONFLICT_ERROR_TEXT,
  LOGIN_UNAUTHORIZED_ERROR_TEXT,
  CURRENT_USER_LS_KEY,
} from '../../utils/constants';
import { IUpdateUserFormValues } from '../../types/user';
import { useLocalStorage } from '../../hooks/useLocalStorage';

const App: FC = () => {
  const navigateTo = useNavigate();
  const { isPresentInLs, getFromLs, saveToLs } = useLocalStorage();

  const initialUserState = isPresentInLs(CURRENT_USER_LS_KEY)
    ? getFromLs(CURRENT_USER_LS_KEY)
    : {};

  const [currentUser, setCurrentUser] = useState(initialUserState);
  const [isLoggedIn, setIsLoggedIn] = useState(
    isPresentInLs(CURRENT_USER_LS_KEY),
  );
  const [serverErrorText, setServerErrorText] = useState('');
  const [isErrorPopup, setIsErrorPopup] = useState(false);
  const [updateUserInfoSuccess, setUpdateUserInfoSuccess] = useState(false);

  // Очистить сообщение об ошибке при регистрации/логине
  const isOnLoginPage = useLocation().pathname === LOGIN_PAGE_URL;
  const isOnRegisterPage = useLocation().pathname === REGISTER_PAGE_URL;

  useEffect(() => {
    setServerErrorText('');
  }, [isOnLoginPage, isOnRegisterPage]);

  // Очистить сообщение об успешном обновлении инф. профайла
  const isOnProfilePage = useLocation().pathname === PROFILE_PAGE_URL;

  useEffect(() => {
    setUpdateUserInfoSuccess(false);
  }, [isOnProfilePage]);

  // Регистрация
  function handleRegister(body: IRegisterFormValues) {
    mainApi
      .registerUser(body)
      .then((res) => {
        if (res) {
          // const registeredUser = {
          //   name: res.data.name,
          //   email: res.data.email,
          // };

          const jwtToken = res.token;

          const registeredUser = {
            name: body.username,
          };

          mainApi.setToken(jwtToken);

          setCurrentUser(registeredUser);
          saveToLs(CURRENT_USER_LS_KEY, registeredUser);
          setIsLoggedIn(true);
          navigateTo(MOVIES_PAGE_URL);
        }
      })
      .catch((err) => {
        if (err.status === 409) {
          setServerErrorText(REGISTER_CONFLICT_ERROR_TEXT);
        } else {
          setIsErrorPopup(true);
          console.error(err);
        }
      });
  }

  // Логин
  function handleLogin(body: ILoginFormValues) {
    mainApi
      .loginUser(body)
      .then((res) => {
        const loggedInUser = {
          name: res.data.name,
          email: res.data.email,
        };

        setCurrentUser(loggedInUser);
        saveToLs(CURRENT_USER_LS_KEY, loggedInUser);
        setIsLoggedIn(true);
        navigateTo(MOVIES_PAGE_URL);
      })
      .catch((err) => {
        if (err.status === 401) {
          setServerErrorText(LOGIN_UNAUTHORIZED_ERROR_TEXT);
        } else {
          setIsErrorPopup(true);
          console.error(err);
        }
      });
  }

  // Выход
  function handleLogout() {
    // mainApi
    //   .logoutUser(currentUser)
    //   .then((res) => {
    //     if (res) {
    //       setCurrentUser({});
    //       localStorage.clear();
    //       setIsLoggedIn(false);
    //       navigateTo(MAIN_PAGE_URL);
    //     }
    //   })
    //   .catch((err) => {
    //     setIsErrorPopup(true);
    //     console.error(err);
    //   });

    setCurrentUser({});
    localStorage.clear();
    setIsLoggedIn(false);
    mainApi.unsetToken();
    navigateTo(MAIN_PAGE_URL);
  }

  // Редактировать профиль
  function handleUpdateUserInfo(data: IUpdateUserFormValues) {
    setUpdateUserInfoSuccess(false);
    mainApi
      .updateUserInfo(data)
      .then((res) => {
        if (res) {
          const updatedUser = {
            name: res.data.name,
            email: res.data.email,
          };

          setCurrentUser(updatedUser);
          saveToLs(CURRENT_USER_LS_KEY, updatedUser);
          setUpdateUserInfoSuccess(true);
        }
      })
      .catch((err) => {
        setIsErrorPopup(true);
        console.error(err);
      });
  }

  // Попап с ошибкой
  function handleCloseErrorPopup() {
    setIsErrorPopup(false);
  }

  function showErrorPopup() {
    setIsErrorPopup(true);
  }

  return (
    <div className="app">
      <Routes>
        <Route
          path={REGISTER_PAGE_URL}
          element={
            <Register
              handleRegister={handleRegister}
              serverErrorText={serverErrorText}
            />
          }
        />

        <Route
          path={LOGIN_PAGE_URL}
          element={
            <Login
              handleLogin={handleLogin}
              serverErrorText={serverErrorText}
            />
          }
        />

        <Route path={MAIN_PAGE_URL} element={<Main loggedIn={isLoggedIn} />} />

        <Route
          path={MOVIES_PAGE_URL}
          element={
            <ProtectedRoute loggedIn={isLoggedIn}>
              <Movies loggedIn={isLoggedIn} />
            </ProtectedRoute>
          }
        />

        <Route
          path={SAVED_MOVIES_PAGE_URL}
          element={
            <ProtectedRoute loggedIn={isLoggedIn}>
              <SavedMovies loggedIn={isLoggedIn} />
            </ProtectedRoute>
          }
        />

        <Route
          path={PROFILE_PAGE_URL}
          element={
            <CurrentUserContext.Provider value={currentUser}>
              <ProtectedRoute loggedIn={isLoggedIn}>
                <Profile
                  loggedIn={isLoggedIn}
                  onLogout={handleLogout}
                  onUpdateUserInfo={handleUpdateUserInfo}
                  isUpdateSuccess={updateUserInfoSuccess}
                />
              </ProtectedRoute>
            </CurrentUserContext.Provider>
          }
        />

        <Route path={NOT_FOUND_PAGE_URL} element={<NotFound />} />
      </Routes>
      {isErrorPopup ? (
        <ErrorPopup onCloseErrorPopup={handleCloseErrorPopup} />
      ) : null}
    </div>
  );
};

export default App;
