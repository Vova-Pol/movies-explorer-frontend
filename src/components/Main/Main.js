import { useState } from 'react';
import './Main.css';
import Header from '../Header/Header';
import Promo from '../Promo/Promo';
import NavTab from '../NavTab/NavTab';
import AboutProject from '../AboutProject/AboutProject';

function Main() {
  const [loggedIn, setLoggedIn] = useState(true);

  // --- Компоненту NavTab прописать якорные ссылки
  return (
    <div className="main">
      <Header loggedIn={loggedIn} />
      <Promo />
      <NavTab />
      <AboutProject />
    </div>
  );
}

export default Main;
