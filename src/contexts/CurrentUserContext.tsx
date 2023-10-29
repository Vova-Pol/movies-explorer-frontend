import React from 'react';
import { ICurrentUser } from '../types/user';

export const defaultCurrentUserValues = {
  username: '',
  email: '',
  jwt: '',
  firstName: '',
  lastName: '',
  dateOfBirth: '',
  favouriteGenres: [],
};

export const CurrentUserContext = React.createContext<ICurrentUser>(
  defaultCurrentUserValues,
);
