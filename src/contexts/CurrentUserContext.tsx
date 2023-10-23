import React from 'react';
import { ICurrentUser } from '../types/user';

export const defaultCurrentUserValues = {
  username: '',
  email: '',
  jwt: '',
};

export const CurrentUserContext = React.createContext<ICurrentUser>(
  defaultCurrentUserValues,
);
