import axios, { AxiosRequestConfig } from 'axios';

class BaseApi {
  public static instance: BaseApi;
  public API_BASE_URL: string;
  public TOKEN: string;

  constructor() {
    this.API_BASE_URL = '/api/v1';
    this.TOKEN = '';
  }

  public static getInstance(): BaseApi {
    if (!BaseApi.instance) {
      BaseApi.instance = new BaseApi();
    }
    return BaseApi.instance;
  }

  public get<T>(path: string, params?: any): Promise<T> {
    return this.request<T>(path, 'GET', params);
  }

  public post<T>(path: string, params?: any): Promise<T> {
    return this.request<T>(path, 'POST', params);
  }

  public put<T>(path: string, params?: any): Promise<T> {
    return this.request<T>(path, 'PUT', params);
  }

  public delete<T>(path: string, params?: any): Promise<T> {
    return this.request<T>(path, 'DELETE', params);
  }

  private request<T>(path: string, method: string, params?: any): Promise<T> {
    const url = `${this.API_BASE_URL}${path}`;
    const options: AxiosRequestConfig = {
      method,
      url,
      data: params,
    };
    return axios(options).then((response) => response.data);
  }
}

export default BaseApi;
