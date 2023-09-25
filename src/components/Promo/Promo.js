import './Promo.css';
import { ReactComponent as BackgroundIcon } from '../../images/promo-background.svg';

function Promo() {
  return (
    <section className="promo">
      <h1 className="promo__title">Movie Explorer</h1>
      <h2 className="promo__subtitle">Найди фильм по душе</h2>
      <BackgroundIcon className="promo__background" />
    </section>
  );
}

export default Promo;
