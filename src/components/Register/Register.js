import './Register.css';
import AuthTop from '../AuthTop/AuthTop';
import AuthForm from '../AuthForm/AuthForm';
import AuthSubmit from '../AuthSubmit/AuthSubmit';

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

  const formId = 'register-form';

  const buttonText = 'Зарегистрироваться';
  const suggestText = 'Уже зарегистрированы?';
  const linkPath = '/signin';
  const linkText = 'Войти';

  return (
    <div className="register">
      <AuthTop title="Добро пожаловать!" />
      <AuthForm inputsList={inputsList} formId={formId} />
      <AuthSubmit
        formId={formId}
        buttonText={buttonText}
        suggestText={suggestText}
        linkPath={linkPath}
        linkText={linkText}
      />
    </div>
  );
}

export default Register;
