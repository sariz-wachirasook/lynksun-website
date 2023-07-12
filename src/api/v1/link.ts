import BaseApi from './base';

import { Link as LinkType } from '../../interfaces/link';

interface LinkParams {
  url: string;
}

interface LinkResponse extends LinkType {}

class Link extends BaseApi {
  public static instance: Link;

  public getAll(): Promise<LinkResponse[]> {
    return this.get('/links');
  }

  public getOne(id: string): Promise<LinkResponse> {
    return this.get(`/links/${id}`);
  }

  public create(params: LinkParams): Promise<any> {
    return this.post('/links', params);
  }

  public update(id: string, params: LinkParams): Promise<any> {
    return this.put(`/links/${id}`, params);
  }

  public delete(id: string): Promise<any> {
    return this.delete(`/links/${id}`);
  }
}

export default Link;
