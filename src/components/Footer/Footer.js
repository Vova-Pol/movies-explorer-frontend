import './Footer.css';

function Footer() {
  const currentDate = new Date();

  return (
    <footer className="footer">
      <p className="footer__text">
        Учебный проект Яндекс.Практикум х BeatFilm.
      </p>
      <div className="footer__line"></div>
      <div className="footer__container">
        <p className="footer__date">{currentDate.getFullYear()}</p>
        <div className="footer__links-container">
          <p className="footer__link">Яндекс.Практикум</p>
          <p className="footer__link">Github</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
