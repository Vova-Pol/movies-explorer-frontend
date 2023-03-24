import '../../index.css';
import { Route, Routes, useNavigate } from 'react-router-dom';
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
import { useLocation } from 'react-router-dom';

function App() {
  const navigateTo = useNavigate();
  const [currentUser, setCurrentUser] = useState({
    name: '',
    email: '',
  });
  const [serverErrorText, setServerErrorText] = useState('');
  const [updateUserInfoSuccess, setUpdateUserInfoSuccess] = useState(false);

  // Очистить сообщение об успешном обновлении инф-ции профайла
  // при переходе на страницу "Профайл"
  const isOnProfilePage = useLocation().pathname === '/profile';

  useEffect(() => {
    setUpdateUserInfoSuccess(false);
    console.log('Hi');
  }, [isOnProfilePage]);

  function clearLocalStorageMoviesList() {
    if (
      localStorage.getItem('movies-list') ||
      localStorage.getItem('search-input-value')
    ) {
      localStorage.removeItem('movies-list');
      localStorage.removeItem('search-input-value');
    }
  }

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
          clearLocalStorageMoviesList();
          navigateTo('/movies');
        }
      })
      .catch((err) => {
        console.error(err);
        setServerErrorText(err);
      });
  }

  function handleLogin(body) {
    mainApi
      .loginUser(body)
      .then((res) => {
        const loggedInUser = {
          name: res.data.name,
          email: res.data.email,
          _id: res.data._id,
        };

        setCurrentUser(loggedInUser);
        clearLocalStorageMoviesList();
        navigateTo('/movies');
      })
      .catch((err) => {
        console.error(err);
        setServerErrorText(err);
      });
  }

  function handleLogout() {
    mainApi
      .logoutUser(currentUser)
      .then((res) => {
        if (res) {
          console.log(res);
          setCurrentUser({
            name: '',
            email: '',
          });
          navigateTo('/');
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }

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
      .catch((err) => {
        console.error(err);
      });
  }

  console.log(currentUser);

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

        <Route exact path="/" element={<Main />} />

        <Route path="/movies" element={<Movies />} />

        <Route path="/saved-movies" element={<SavedMovies />} />

        <Route
          path="/profile"
          element={
            <CurrentUserContext.Provider value={currentUser}>
              <Profile
                onLogout={handleLogout}
                onUpdateUserInfo={handleUpdateUserInfo}
                isUpdateSuccess={updateUserInfoSuccess}
              />
            </CurrentUserContext.Provider>
          }
        />
      </Routes>

      {/* <NotFound /> */}
    </div>
  );
}

export default App;
