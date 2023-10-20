export interface IUser {
  username: string;
  email: string;
  password: string;
}

export interface IUpdateUserFormValues {
  username?: string;
  email?: string;
}

export interface ICurrentUser {
  username: string;
  email: string;
  jwt: string;
}
