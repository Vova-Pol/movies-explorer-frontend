import '../../index.css';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import Login from '../Login/Login';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import Register from '../Register/Register';
import SavedMovies from '../SavedMovies/SavedMovies';
import NotFound from '../NotFound/NotFound';
import Profile from '../Profile/Profile';
import { registerUser, loginUser, getSavedMovies } from '../../utils/MainApi';

function App() {
  const navigateTo = useNavigate();
  const [currentUser, setCurrentUser] = useState({
    name: '',
    email: '',
  });

  function handleRegister(body) {
    registerUser(body)
      .then((res) => {
        if (res) {
          const registeredUser = {
            name: res.data.name,
            email: res.data.email,
            _id: res.data._id,
          };

          setCurrentUser(registeredUser);
          navigateTo('/movies');

          if (
            localStorage.getItem('movies-list') ||
            localStorage.getItem('search-input-value')
          ) {
            localStorage.removeItem('movies-list');
            localStorage.removeItem('search-input-value');
          }
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
          element={<Register handleRegister={handleRegister} />}
        />

        <Route path="/signin" element={<Login />} />

        <Route exact path="/" element={<Main />} />

        <Route
          path="/movies"
          element={
            <CurrentUserContext.Provider value={currentUser}>
              <Movies />
            </CurrentUserContext.Provider>
          }
        />

        <Route
          path="/saved-movies"
          element={
            <CurrentUserContext.Provider value={currentUser}>
              <SavedMovies />
            </CurrentUserContext.Provider>
          }
        />

        <Route
          path="/profile"
          element={
            <CurrentUserContext.Provider value={currentUser}>
              <Profile />
            </CurrentUserContext.Provider>
          }
        />
      </Routes>

      {/* <NotFound /> */}
    </div>
  );
}

export default App;
