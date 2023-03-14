import './Login.css';
import AuthTop from '../AuthTop/AuthTop';
import AuthForm from '../AuthForm/AuthForm';

function Login() {
  const inputsList = [
    {
      name: 'email',
      title: 'E-mail',
      type: 'email',
    },
    {
      name: 'password',
      title: 'Пароль',
      type: 'password',
    },
  ];

  const buttonText = 'Войти';
  const suggestText = 'Ещё не зарегистрированы?';
  const linkPath = '/signup';
  const linkText = 'Регистрация';

  return (
    <div className="login">
      <AuthTop title="Рады видеть!" />
      <AuthForm
        inputsList={inputsList}
        buttonText={buttonText}
        suggestText={suggestText}
        linkPath={linkPath}
        linkText={linkText}
      />
    </div>
  );
}

export default Login;
