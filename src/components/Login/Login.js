import './Login.css';
import AuthTop from '../AuthTop/AuthTop';
import AuthForm from '../AuthForm/AuthForm';
import AuthSubmit from '../AuthSubmit/AuthSubmit';

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

  const formId = 'login-form';

  const buttonText = 'Войти';
  const suggestText = 'Ещё не зарегистрированы?';
  const linkPath = '/signup';
  const linkText = 'Регистрация';

  return (
    <div className="login">
      <AuthTop title="Рады видеть!" />
      <AuthForm inputsList={inputsList} fromId={formId} />
      <AuthSubmit
        buttonText={buttonText}
        suggestText={suggestText}
        linkPath={linkPath}
        linkText={linkText}
      />
    </div>
  );
}

export default Login;
