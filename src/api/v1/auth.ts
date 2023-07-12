import BaseApi from './base';

class Auth extends BaseApi {
  public static instance: Auth;

  public static getInstance(): Auth {
    if (!Auth.instance) {
      Auth.instance = new Auth();
    }
    return Auth.instance;
  }

  public login<T>(params?: any): Promise<T> {
    return this.post<T>('/auth/login', params);
  }

  public register<T>(params?: any): Promise<T> {
    return this.post<T>('/auth/register', params);
  }

  public refreshToken<T>(params?: any): Promise<T> {
    return this.post<T>('/auth/refresh-token', params);
  }
}

export default Auth;
