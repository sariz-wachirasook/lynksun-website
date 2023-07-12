import BaseApi from './base';

interface LoginParams {
  email: string;
  password: string;
}

interface RegisterParams {
  email: string;
  password: string;
  confirmPassword: string;
}

interface LoginResponse {
  token: string;
  refresh_token: string;
}

class Auth extends BaseApi {
  public static instance: Auth;

  public static getInstance(): Auth {
    if (!Auth.instance) {
      Auth.instance = new Auth();
    }
    return Auth.instance;
  }

  public login(params: LoginParams): Promise<LoginResponse> {
    return this.post('/auth/login', params);
  }

  public register(params: RegisterParams): Promise<any> {
    return this.post('/auth/register', params);
  }

  public refreshToken(): Promise<LoginResponse> {
    return this.post('/auth/refresh-token');
  }
}

export default Auth;
