import { useState } from 'react';
import './Main.css';
import Header from '../Header/Header';

function Main() {
  const [loggedIn, setLoggedIn] = useState(true);
  return (
    <div className="main">
      <Header loggedIn={loggedIn} />
    </div>
  );
}

export default Main;
