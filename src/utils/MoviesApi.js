import { MOVIES_API_URL } from './constants';

const init = {
  method: 'GET',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
};

function getMoviesList() {
  return fetch(MOVIES_API_URL, init).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(res);
    }
  });
}

export default getMoviesList;
