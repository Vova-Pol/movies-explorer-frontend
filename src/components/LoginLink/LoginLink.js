import './LoginLink.css';
import { Link } from 'react-router-dom';

function LoginLink() {
  return (
    <div className="login-link">
      <Link to="/signup" className="login-link__regestration">
        Регистрация
      </Link>
      <Link to="/signin" className="login-link__login">
        Вход
      </Link>
    </div>
  );
}

export default LoginLink;
