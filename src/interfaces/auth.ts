export interface RegisterParamsType {
  name: string;
  email: string;
  password: string;
}

export interface LoginParamsType {
  email: string;
  password: string;
}

export interface LoginResponseType {
  token: string;

  // TODO: add refresh token
  // refresh_token: string;
}
