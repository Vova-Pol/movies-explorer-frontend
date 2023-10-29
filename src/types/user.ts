export interface ICurrentUser {
  username: string;
  email: string;
  jwt: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  favouriteGenres: Genre[];
}

export interface IUpdateUsernameFormValues {
  username: string;
  password: string;
}

export interface IUpdateUserProfileFormValues {
  email: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  favouriteGenres: Genre[];
}

export enum Genre {
  COMEDY = 'Комедия',
  THRILLER = 'Боевик',
  DETECTIVE = 'Детектив',
  FAMILY = 'Семейный',
  DOCUMENTARY = 'Докуметальный',
  HISTORICAL = 'Исторический',
  FANTASY = 'Фэнтези',
  DRAMA = 'Драма',
  ADVENTURE = 'Приключения',
}
