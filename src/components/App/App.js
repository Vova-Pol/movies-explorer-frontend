import '../../index.css';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import Login from '../Login/Login';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import Register from '../Register/Register';
import SavedMovies from '../SavedMovies/SavedMovies';
import NotFound from '../NotFound/NotFound';
import Profile from '../Profile/Profile';
import { mainApi } from '../../utils/MainApi';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

function App() {
  const navigateTo = useNavigate();
  const [currentUser, setCurrentUser] = useState({
    name: '',
    email: '',
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [serverErrorText, setServerErrorText] = useState('');
  const [updateUserInfoSuccess, setUpdateUserInfoSuccess] = useState(false);

  // Очистить сообщение об ошибке при регистрации/логине
  const isOnLoginPage = useLocation().pathname === '/signin';
  const isOnRegisterPage = useLocation().pathname === '/signup';

  useEffect(() => {
    setServerErrorText('');
  }, [isOnLoginPage, isOnRegisterPage]);

  // Очистить сообщение об успешном обновлении инф. профайла
  const isOnProfilePage = useLocation().pathname === '/profile';

  useEffect(() => {
    setUpdateUserInfoSuccess(false);
  }, [isOnProfilePage]);

  // Очистить список фильмов и поисковую строку
  function clearLocalStorageMoviesList() {
    if (
      localStorage.getItem('movies-list') ||
      localStorage.getItem('search-input-value')
    ) {
      localStorage.removeItem('movies-list');
      localStorage.removeItem('search-input-value');
    }
  }

  // Регистрация
  function handleRegister(body) {
    mainApi
      .registerUser(body)
      .then((res) => {
        if (res) {
          const registeredUser = {
            name: res.data.name,
            email: res.data.email,
            _id: res.data._id,
          };

          setCurrentUser(registeredUser);
          setIsLoggedIn(true);
          clearLocalStorageMoviesList();
          navigateTo('/movies');
        }
      })
      .catch((errStatus) => {
        if (String(errStatus) === '409') {
          setServerErrorText('Пользователь с таким email уже существует');
        } else {
          setServerErrorText('Ошибка на сервере: ' + errStatus);
        }
      });
  }

  // Логин
  function handleLogin(body) {
    mainApi
      .loginUser(body)
      .then((res) => {
        const loggedInUser = {
          name: res.data.name,
          email: res.data.email,
        };

        setCurrentUser(loggedInUser);
        setIsLoggedIn(true);
        clearLocalStorageMoviesList();
        navigateTo('/movies');
      })
      .catch((errStatus) => {
        if (String(errStatus) === '401') {
          setServerErrorText('Неправильные почта или пароль');
        } else {
          setServerErrorText('Ошибка на сервере: ' + errStatus);
        }
      });
  }

  // Выход
  function handleLogout() {
    mainApi
      .logoutUser(currentUser)
      .then((res) => {
        if (res) {
          setCurrentUser({
            name: '',
            email: '',
          });
          setIsLoggedIn(false);
          navigateTo('/');
        }
      })
      .catch((errStatus) => {
        console.error(errStatus);
      });
  }

  // Редактировать профиль
  function handleUpdateUserInfo(data) {
    setUpdateUserInfoSuccess(false);
    mainApi
      .updateUserInfo(data)
      .then((res) => {
        if (res) {
          setCurrentUser(res.data);
          setUpdateUserInfoSuccess(true);
        }
      })
      .catch((errStatus) => {
        console.error(errStatus);
      });
  }

  return (
    <div className="app">
      <Routes>
        <Route
          path="/signup"
          element={
            <Register
              handleRegister={handleRegister}
              serverErrorText={serverErrorText}
            />
          }
        />

        <Route
          path="/signin"
          element={
            <Login
              handleLogin={handleLogin}
              serverErrorText={serverErrorText}
            />
          }
        />

        <Route exact path="/" element={<Main loggedIn={isLoggedIn} />} />

        <Route
          path="/movies"
          element={
            <ProtectedRoute loggedIn={isLoggedIn}>
              <Movies loggedIn={isLoggedIn} />
            </ProtectedRoute>
          }
        />

        <Route
          path="/saved-movies"
          element={
            <ProtectedRoute loggedIn={isLoggedIn}>
              <SavedMovies loggedIn={isLoggedIn} />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
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

        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
