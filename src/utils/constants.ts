// Адреса запросов
// export const MAIN_API_URL = 'https://api.movie-vova-pol.nomoredomains.work';
export const MAIN_API_URL = 'http://localhost:3001';
export const MOVIES_API_URL = 'https://api.nomoreparties.co/beatfilm-movies';
export const IMAGES_URL = 'https://api.nomoreparties.co';

// Тексты ошибок
export const NOTHING_FOUND_ERROR_TEXT = 'Ничего не найдено';
export const SERVER_ERROR_TEXT =
  'Произошла ошибка на сервере. Перезагрузите страницу и попробуйте ещё раз.';
export const REGISTER_CONFLICT_ERROR_TEXT =
  'Пользователь с таким email уже существует';
export const LOGIN_UNAUTHORIZED_ERROR_TEXT = 'Неправильные почта или пароль';
export const EMPTY_SEARCH_INPUT_ERROR_TEXT = 'Нужно ввести ключевое слово';

// Регулярные выражения
export const REGEX_EMAIL = new RegExp(/^[a-z0-9\-]+@[a-z]+.[a-z]{2,3}$/);
export const REGEX_NAME = new RegExp(/^[a-zA-Z0-9а-яА-ЯЁё\s]+$/);
export const REGEX_PASSWORD = new RegExp(/^[A-Za-z0-9\w]+$/);

// Адреса страниц
export const REGISTER_PAGE_URL = '/signup';
export const LOGIN_PAGE_URL = '/signin';
export const MAIN_PAGE_URL = '/';
export const PROFILE_PAGE_URL = '/profile';
export const MOVIES_PAGE_URL = '/movies';
export const SAVED_MOVIES_PAGE_URL = '/saved-movies';
export const NOT_FOUND_PAGE_URL = '*';

// Количество выводимых фильмов
export const MOVIES_AMOUNT_SHOWN_LAPTOP = 7;
export const MOVIES_AMOUNT_STEP_LAPTOP = 7;
export const MOVIES_AMOUNT_SHOWN_MOBILE = 5;
export const MOVIES_AMOUNT_STEP_MOBILE = 5;

// Длина короткометражки
export const SHORT_MOVIE_DURATION = 40;

// Ключи для хранения в Local Storage
export const SAVED_MOVIES_LIST_LS_KEY = 'saved-movies-list';
export const LAST_SEARCH_DATA_LS_KEY = 'last-search-data';
