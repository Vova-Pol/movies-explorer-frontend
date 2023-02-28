import { useState } from 'react';
import './Main.css';
import Header from '../Header/Header';
import Promo from '../Promo/Promo';

function Main() {
  const [loggedIn, setLoggedIn] = useState(true);
  return (
    <div className="main">
      <Header loggedIn={loggedIn} />
      <Promo />
    </div>
  );
}

export default Main;
