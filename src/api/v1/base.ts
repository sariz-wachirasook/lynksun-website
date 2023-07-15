import axios, { AxiosRequestConfig } from 'axios';
import { getCookie } from '../../utils/cookie';
import { DeleteResponseType } from '../../interfaces/response';
import { toast } from 'react-toastify';
import { t } from 'i18next';

class BaseService {
  public static instance: BaseService;
  private API_BASE_URL: string;
  private TOKEN: string;
  private ACCEPT: string;

  constructor() {
    this.API_BASE_URL = import.meta.env.PUBLIC_API_BASE_URL + '/api/v1';
    this.TOKEN = getCookie('token');
    this.ACCEPT = 'application/json';
  }

  public static getInstance(): BaseService {
    if (!BaseService.instance) {
      BaseService.instance = new BaseService();
    }
    return BaseService.instance;
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
    const apiOptions = {
      baseURL: this.API_BASE_URL,
      timeout: 30000,
      headers: {
        Accept: this.ACCEPT,
        Authorization: `Bearer ${this.TOKEN}`,
      },
    };

    const api = axios.create(apiOptions);

    const url = `${path}`;

    const options: AxiosRequestConfig = {
      method,
      url,
    };

    if (method === 'GET') {
      options.params = params;
    }

    if (method === 'POST' || method === 'PUT') {
      options.data = params;
    }

    api.interceptors.response.use(
      (response) => {
        switch (response.config.method) {
          case 'post':
            toast.success(t('create-success'));
            break;
          case 'put':
            toast.success(t('update-success'));
            break;
          case 'delete':
            toast.success(t('delete-success'));
            break;
          default:
            break;
        }

        return response && response.data;
      },
      (error) => {
        if (error.response && error.response.data) {
          toast.error(error.response.data?.message || t('something-went-wrong'));
        }

        if (error.code === 'ERR_NETWORK') {
          toast.error(t('network-error'));
        }

        throw error;
      },
    );

    return api(options);
  }
}

export default BaseService;
