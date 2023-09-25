import { useState } from 'react';
import './Main.css';
import Header from '../Header/Header';
import Promo from '../Promo/Promo';
import Footer from '../Footer/Footer';

function Main(props) {
  return (
    <div className="main">
      <Header loggedIn={props.loggedIn} />
      <main>
        <Promo />
      </main>
      <Footer />
    </div>
  );
}

export default Main;
