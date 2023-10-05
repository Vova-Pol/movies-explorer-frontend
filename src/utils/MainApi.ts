import { MAIN_API_URL } from './constants';
import { DataType, MethodType } from '../types/api';
import { ILoginFormValues, IRegisterFormValues } from '../types/auth';
import { IUpdateUserFormValues, IUser } from '../types/user';
import { IMovie } from '../types/movie';

class Api {
  _baseUrl: string;

  constructor(url: string) {
    this._baseUrl = url;
  }

  _sendRequest(urlEnding: string, method: MethodType, data?: DataType) {
    const init: RequestInit = {
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

  registerUser(data: IRegisterFormValues) {
    return this._sendRequest('/signup', 'POST', data);
  }

  loginUser(data: ILoginFormValues) {
    return this._sendRequest('/signin', 'POST', data);
  }

  logoutUser(data: IUser) {
    return this._sendRequest('/signout', 'POST', data);
  }

  updateUserInfo(data: IUpdateUserFormValues) {
    return this._sendRequest('/users/me', 'PATCH', data);
  }

  // Movies Methods

  saveMovie(data: IMovie) {
    return this._sendRequest('/movies', 'POST', data);
  }

  getSavedMovies() {
    return this._sendRequest('/movies', 'GET');
  }

  deleteMovie(id: number) {
    return this._sendRequest(`/movies/${id}`, 'DELETE');
  }
}

export const mainApi = new Api(MAIN_API_URL);
