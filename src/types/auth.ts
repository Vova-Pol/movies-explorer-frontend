export enum AuthFields {
  USERNAME = 'username',
  EMAIL = 'email',
  PASSWORD = 'password',
}

export enum AuthInputTypes {
  TEXT = 'text',
  EMAIL = 'email',
  PASSWORD = 'password',
}

export interface ILoginFormValues {
  [AuthFields.USERNAME]: string;
  [AuthFields.PASSWORD]: string;
}

export interface IRegisterFormValues {
  [AuthFields.USERNAME]: string;
  [AuthFields.EMAIL]: string;
  [AuthFields.PASSWORD]: string;
}

export interface IAuthFormValues {
  [AuthFields.USERNAME]: string;
  [AuthFields.EMAIL]?: string;
  [AuthFields.PASSWORD]: string;
}

export interface IAuthFormConfig {
  fields: IAuthFormField[];
  submitButtonText: string;
}

interface IAuthFormField {
  labelTitle: string;
  inputType:
    | AuthInputTypes.TEXT
    | AuthInputTypes.EMAIL
    | AuthInputTypes.PASSWORD;
  inputName: AuthFields.USERNAME | AuthFields.PASSWORD | AuthFields.EMAIL;
  minLength: number | null;
  maxLength: number | null;
  pattern: string;
}
