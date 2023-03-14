import '../../index.css';
import Login from '../Login/Login';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import Register from '../Register/Register';
import SavedMovies from '../SavedMovies/SavedMovies';
import NotFound from '../NotFound/NotFound';
import Profile from '../Profile/Profile';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/signup" element={<Register />} />

        <Route path="/signin" element={<Login />} />

        <Route exact path="/" element={<Main />} />

        <Route path="/movies" element={<Movies />} />

        <Route path="/saved-movies" element={<SavedMovies />} />

        <Route path="/profile" element={<Profile />} />
      </Routes>

      {/* <NotFound /> */}
    </div>
  );
}

export default App;
