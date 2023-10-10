import React from 'react';
import { IUser } from '../types/user';

export const CurrentUserContext = React.createContext<IUser>({
  username: '',
  email: '',
  password: '',
});
