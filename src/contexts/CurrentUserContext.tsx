import React from 'react';
import { IUser } from '../types/user';

export const CurrentUserContext = React.createContext<IUser>({
  name: '',
  email: '',
  password: '',
});
