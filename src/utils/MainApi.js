import { MAIN_API_URL } from './constants';

class Api {
  constructor(url) {
    this._baseUrl = url;
  }

  _sendRequest(urlEnding, method, data = null) {
    const init = {
      method: method,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    };

    const url = this._baseUrl + urlEnding;

    if (method !== 'GET' && method !== 'DELETE') {
      init.body = JSON.stringify(data);
    }

    return fetch(url, init).then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(res);
      }
    });
  }

  // User Methods

  registerUser(data) {
    return this._sendRequest('/signup', 'POST', data);
  }

  loginUser(data) {
    return this._sendRequest('/signin', 'POST', data);
  }

  logoutUser(data) {
    return this._sendRequest('/signout', 'POST', data);
  }

  updateUserInfo(data) {
    return this._sendRequest('/users/me', 'PATCH', data);
  }

  // Movies Methods

  saveMovie(data) {
    return this._sendRequest('/movies', 'POST', data);
  }

  getSavedMovies() {
    return this._sendRequest('/movies', 'GET');
  }

  deleteMovie(movieId) {
    return this._sendRequest(`/movies/${movieId}`, 'DELETE');
  }
}

export const mainApi = new Api(MAIN_API_URL);
