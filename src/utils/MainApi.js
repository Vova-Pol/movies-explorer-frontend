const mainApiUrl = 'https://api.movie-vova-pol.nomoredomains.work';
// const mainApiUrl = 'http://localhost:3001';

const init = {
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  credentials: 'include',
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
  console.log(data);
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

export function saveMovie(data) {
  init.method = 'POST';
  init.body = JSON.stringify(data);

  return fetch(`${mainApiUrl}/movies`, init).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject('Сервер ответил ошибкой: ' + res.status);
    }
  });
}

export function getSavedMovies() {
  init.method = 'GET';
  return fetch(`${mainApiUrl}/movies`, init).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject('Сервер ответил ошибкой: ' + res.status);
    }
  });
}
