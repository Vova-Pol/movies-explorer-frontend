import React from 'react';
import { ICurrentUser } from '../types/user';

export const CurrentUserContext = React.createContext<ICurrentUser | null>(
  null,
);
