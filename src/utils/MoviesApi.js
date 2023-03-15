const moviesApiURL = 'https://api.nomoreparties.co/beatfilm-movies';

const init = {
  method: 'GET',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
};

function getMoviesList() {
  return fetch(moviesApiURL, init).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject('Сервер ответил ошибкой: ' + res.status);
    }
  });
}

export default getMoviesList;
