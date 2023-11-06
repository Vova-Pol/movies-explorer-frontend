import { MAIN_API_URL } from './constants';
import { ILoginFormValues, IRegisterFormValues } from '../types/auth';
import { ISavedMovie } from '../types/movie';
import axios, { AxiosInstance } from 'axios';
import {
  IUpdateUserProfileFormValues,
  IUpdateUsernameFormValues,
} from '../types/user';

class MainApi {
  apiClient: AxiosInstance;

  constructor(baseUrl: string) {
    this.apiClient = axios.create({
      baseURL: baseUrl,
    });
  }

  setToken(token: string) {
    this.apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }

  unsetToken() {
    this.apiClient.defaults.headers.common['Authorization'] = null;
  }

  // User Methods

  registerUser(data: IRegisterFormValues) {
    return this.apiClient.post('/signup', data);
  }

  loginUser(data: ILoginFormValues) {
    return this.apiClient.post('/signin', data);
  }

  logoutUser() {
    return this.apiClient.post('/signout', null);
  }

  updateUserProfile(data: IUpdateUserProfileFormValues) {
    return this.apiClient.patch('/users/me/profile', data);
  }

  upadteUsername(data: IUpdateUsernameFormValues) {
    return this.apiClient.patch('users/me/username', data);
  }

  getUserInfo() {
    return this.apiClient.get('users/me');
  }

  // Movies Methods

  saveMovie(data: ISavedMovie) {
    return this.apiClient.post('/movies', data);
  }

  getSavedMovies() {
    return this.apiClient.get('/movies');
  }

  deleteMovie(id: number) {
    return this.apiClient.delete(`/movies/${id}`);
  }
}

export const mainApi = new MainApi(MAIN_API_URL);
