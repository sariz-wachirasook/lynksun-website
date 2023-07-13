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

  public getMe(): Promise<any> {
    return this.get('/auth/me');
  }

  public updateMe(params: any): Promise<any> {
    return this.put('/auth/me', params);
  }

  public updatePassword(params: any): Promise<any> {
    return this.put('/auth/update-password', params);
  }

  public deleteMe(): Promise<any> {
    return this.delete('/auth/me');
  }

  // TODO: add refresh token
  // public refreshToken(): Promise<LoginResponseType> {
  //   return this.post('/auth/refresh-token');
  // }
}

export default AuthService;
