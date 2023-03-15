import './Navigation.css';
import { Link } from 'react-router-dom';
import useResize from '../../hooks/useResize';

function Navigation() {
  const { isScreenTablet, isScreenMobile } = useResize();

  return (
    <nav className="navigation">
      {isScreenMobile || isScreenTablet ? (
        <Link to="/" className="navigation__link">
          Главная
        </Link>
      ) : null}
      <Link to="/movies" className="navigation__link">
        Фильмы
      </Link>
      <Link to="/saved-movies" className="navigation__link">
        Сохранённые фильмы
      </Link>
    </nav>
  );
}

export default Navigation;
