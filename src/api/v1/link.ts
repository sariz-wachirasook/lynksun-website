import BaseApi from './base';

interface LinkParams {
  url: string;
}

interface LinkResponse {
  id: string;
  url: string;
  shortUrl: string;
  createdAt: string;
  updatedAt: string;
}

class Link extends BaseApi {
  public static instance: Link;

  public getAll(): Promise<LinkResponse[]> {
    return this.get('/link');
  }

  public getOne(id: string): Promise<LinkResponse> {
    return this.get(`/link/${id}`);
  }

  public createShortLink(params: LinkParams): Promise<any> {
    return this.post('/link', params);
  }

  public update(id: string, params: LinkParams): Promise<any> {
    return this.put(`/link/${id}`, params);
  }

  public delete(id: string): Promise<any> {
    return this.delete(`/link/${id}`);
  }
}

export default Link;
