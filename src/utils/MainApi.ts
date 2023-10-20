import { MAIN_API_URL } from './constants';
import { DataType, MethodType } from '../types/api';
import { ILoginFormValues, IRegisterFormValues } from '../types/auth';
import { IUpdateUserFormValues, IUser } from '../types/user';
import { ISavedMovie } from '../types/movie';
import axios from 'axios';

class MainApi {
  _baseUrl: string;
  _init: RequestInit;

  constructor(url: string) {
    this._baseUrl = url;
    this._init = {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      // credentials: 'include',
    };
  }

  _setMethod(method: MethodType) {
    this._init.method = method;
  }

  _setBody(body: DataType) {
    this._init.body = JSON.stringify(body);
  }

  setToken(token: string) {
    this._init.headers = {
      ...this._init.headers,
      Authorization: `Bearer ${token}`,
    };
  }

  unsetToken() {
    this._init.headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };
  }

  _sendRequest(urlEnding: string, method: MethodType, data?: DataType | null) {
    this._setMethod(method);
    const url = this._baseUrl + urlEnding;

    if (method !== 'GET' && method !== 'DELETE' && data) this._setBody(data);

    return fetch(url, this._init).then((res) => {
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

  logoutUser() {
    return this._sendRequest('/signout', 'POST', null);
  }

  updateUserInfo(data: IUpdateUserFormValues) {
    return this._sendRequest('/users/me', 'PATCH', data);
  }

  // Movies Methods

  saveMovie(data: ISavedMovie) {
    return this._sendRequest('/movies', 'POST', data);
  }

  getSavedMovies() {
    return this._sendRequest('/movies', 'GET');
  }

  deleteMovie(id: number) {
    return this._sendRequest(`/movies/${id}`, 'DELETE');
  }
}

export const mainApi = new MainApi(MAIN_API_URL);
