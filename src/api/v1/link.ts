import BaseApi from './base';

import { LinkType, LinkParamsType, LinksType } from '../../interfaces/link';
import { DeleteResponseType } from '../../interfaces/response';

class LinkService extends BaseApi {
  public static instance: LinkService;

  public getAll(): Promise<LinksType> {
    return this.get('/links');
  }

  public getOne(id: any): Promise<LinkType> {
    return this.get(`/links/${id}`);
  }

  public create(params: LinkParamsType): Promise<LinkType> {
    return this.post('/links', params);
  }

  public update(id: any, params: LinkParamsType): Promise<LinkType> {
    return this.put(`/links/${id}`, params);
  }

  public delete(id: any): Promise<DeleteResponseType> {
    return this.delete(`/links/${id}`);
  }
}

export default LinkService;
