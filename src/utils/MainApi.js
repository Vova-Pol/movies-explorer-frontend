const mainApiUrl = 'https://api.movie-vova-pol.nomoredomains.work';
// const mainApiUrl = 'http://localhost:3001';

// turn on cookies:
// credentials: 'include'

const init = {
  method: 'GET',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
};

export function registerUser(data) {
  init.method = 'POST';
  init.body = JSON.stringify(data);

  return fetch(`${mainApiUrl}/signup`, init).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject('Сервер ответил ошибкой: ' + res.status);
    }
  });
}

export function loginUser(data) {
  init.method = 'POST';
  init.body = JSON.stringify(data);

  return fetch(`${mainApiUrl}/signin`, init).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject('Сервер ответил ошибкой: ' + res.status);
    }
  });
}

export function getSavedMovies() {
  return fetch(`${mainApiUrl}/movies`, init).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject('Сервер ответил ошибкой: ' + res.status);
    }
  });
}
