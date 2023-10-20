import axios from 'axios';
import { MOVIES_API_URL } from './constants';

class MoviesApi {
  _baseUrl: string;

  constructor(url: string) {
    this._baseUrl = url;
  }

  getMoviesList() {
    return axios.get(MOVIES_API_URL);
  }
}

export const moviesApi = new MoviesApi(MOVIES_API_URL);
