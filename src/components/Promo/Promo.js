import './Promo.css';
import { ReactComponent as BackgroundIcon } from '../../images/background-icon.svg';

function Promo() {
  return (
    <section className="promo">
      <h1 className="promo__title">
        Учебный проект студента факультета Веб-разработки.
      </h1>
      <BackgroundIcon className="promo__background" />
    </section>
  );
}

export default Promo;
