import axios, { AxiosRequestConfig } from 'axios';
import { getCookie } from '../../utils/cookie';
import { DeleteResponseType } from '../../interfaces/response';

class BaseApi {
  public static instance: BaseApi;
  private API_BASE_URL: string;
  private TOKEN: string;

  constructor() {
    this.API_BASE_URL = import.meta.env.VITE_API_BASE_URL + '/api/v1';
    this.TOKEN = getCookie('token');
  }

  public static getInstance(): BaseApi {
    if (!BaseApi.instance) {
      BaseApi.instance = new BaseApi();
    }
    return BaseApi.instance;
  }

  public get<T>(path: string, params?: any): Promise<T> {
    return this.request(path, 'GET', params);
  }

  public post<T>(path: string, params?: any): Promise<T> {
    return this.request(path, 'POST', params);
  }

  public put<T>(path: string, params?: any): Promise<T> {
    return this.request(path, 'PUT', params);
  }

  public delete<T>(path: string, params?: any): Promise<DeleteResponseType> {
    return this.request(path, 'DELETE', params);
  }

  private async request<T>(path: string, method: string, params?: any): Promise<T> {
    const url = `${path}`;
    const options: AxiosRequestConfig = {
      baseURL: this.API_BASE_URL,
      method,
      url,
    };

    if (method === 'GET') {
      options.params = params;
    }

    if (method === 'POST' || method === 'PUT') {
      options.data = params;
    }

    if (this.TOKEN) {
      options.headers = {
        Authorization: `Bearer ${this.TOKEN}`,
      };
    }

    console.log('options', options);

    return axios(options).then((response) => response.data);
  }
}

export default BaseApi;
