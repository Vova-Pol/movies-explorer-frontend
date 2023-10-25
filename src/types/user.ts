export interface ICurrentUser {
  username: string;
  email: string;
  jwt: string;
}

export interface IUpdateUserFormValues {
  username?: string;
  email?: string;
}
