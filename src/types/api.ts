import { ILoginFormValues, IRegisterFormValues } from './auth';
import { IMovie, ISavedMovie } from './movie';
import { IUpdateUserFormValues, IUser } from './user';

export type MethodType = 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE';

export type DataType =
  | IMovie
  | ISavedMovie
  | IUser
  | IUpdateUserFormValues
  | IRegisterFormValues
  | ILoginFormValues;
