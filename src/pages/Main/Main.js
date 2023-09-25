import { useState } from 'react';
import './Main.css';
import Header from '../../components/Header/Header';
import Promo from '../../components/Promo/Promo';
import Footer from '../../components/Footer/Footer';

function Main(props) {
  return (
    <div className="main">
      {/* <Header loggedIn={props.loggedIn} /> */}
      <Header loggedIn={true} />
      <main>
        <Promo />
      </main>
      <Footer />
    </div>
  );
}

export default Main;
