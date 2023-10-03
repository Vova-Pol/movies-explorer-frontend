export interface IUser {
  name: string;
  email: string;
  password: string;
}

export interface IUpdateUserFormValues {
  name?: string;
  email?: string;
  password?: string;
}
