import { LoginParamsType, LoginResponseType, RegisterParamsType } from '../../interfaces/auth';
import BaseApi from './base';

class AuthService extends BaseApi {
  public static instance: AuthService;

  public login(params: LoginParamsType): Promise<LoginResponseType> {
    return this.post('/auth/login', params);
  }

  public register(params: RegisterParamsType): Promise<LoginResponseType> {
    return this.post('/auth/register', params);
  }

  public refreshToken(): Promise<LoginResponseType> {
    return this.post('/auth/refresh-token');
  }
}

export default AuthService;
