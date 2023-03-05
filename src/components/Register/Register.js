import './Register.css';
import AuthTop from '../AuthTop/AuthTop';
import AuthForm from '../AuthForm/AuthForm';

function Register() {
  const inputsList = [
    {
      name: 'name',
      title: 'Имя',
      type: 'text',
    },
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

  const buttonText = 'Зарегистрироваться';
  const suggestText = 'Уже зарегистрированы?';
  const linkPath = '/signin';
  const linkText = 'Войти';

  return (
    <div className="register">
      <AuthTop title="Добро пожаловать!" />
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

export default Register;
