import '../../index.css';
import Login from '../Login/Login';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import Register from '../Register/Register';
import SavedMovies from '../SavedMovies/SavedMovies';
import NotFound from '../NotFound/NotFound';
import Profile from '../Profile/Profile';

function App() {
  return (
    <div className="app">
      {/* <Login /> */}
      {/* <Register /> */}
      <Profile />
      <Main />
      {/* <Movies /> */}
      {/* <SavedMovies /> */}
      {/* <NotFound /> */}
    </div>
  );
}

export default App;
