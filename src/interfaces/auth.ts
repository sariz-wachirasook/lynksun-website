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
  refresh_token: string;
}
