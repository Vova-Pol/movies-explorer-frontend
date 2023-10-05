import { IMovie } from './movie';
import { IUpdateUserFormValues, IUser } from './user';

export type MethodType = 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE';

export type DataType = IMovie | IUser | IUpdateUserFormValues;
