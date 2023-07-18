import axios, { AxiosRequestConfig } from 'axios';

// GRAPH QL
class BaseService {
  public static instance: BaseService;
  private API_BASE_URL: string;
  private CONTENT_TYPE: string;

  constructor() {
    this.API_BASE_URL = import.meta.env.PUBLIC_CMS_API_BASE_URL + '/';
    this.CONTENT_TYPE = 'application/json';
  }

  public static getInstance(): BaseService {
    if (!BaseService.instance) {
      BaseService.instance = new BaseService();
    }
    return BaseService.instance;
  }

  public post<T>(path: string, params?: any): Promise<T> {
    return this.request(path, 'POST', params);
  }

  private async request<T>(path: string, method: string, params?: any): Promise<T> {
    let data = JSON.stringify({
      query: `${params}`,
      variables: {},
    });

    const config = {
      method,
      maxBodyLength: Infinity,
      url: this.API_BASE_URL + path,
      headers: {
        'Content-Type': this.CONTENT_TYPE,
      },
      data: data,
    };

    const api = axios.create(config);

    api.interceptors.response.use(
      (response) => {
        return response.data ?? response.data;
      },
      (error) => {
        return Promise.reject(error);
      },
    );

    return api(config);
  }
}

export default BaseService;
