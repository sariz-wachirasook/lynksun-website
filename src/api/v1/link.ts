import BaseApi from './base';

import { LinkType, LinkParamsType, LinksType } from '../../interfaces/link';
import { DeleteResponseType } from '../../interfaces/response';

interface LinkQueryParamsType {
  search?: string;
}

class LinkService extends BaseApi {
  public static instance: LinkService;

  // ---------- CRUD ---------- //
  public getAll(params?: LinkQueryParamsType): Promise<LinksType> {
    return this.get('/links', params);
  }

  public getOne(id: any): Promise<LinkType> {
    return this.get(`/links/${id}`);
  }

  public getOneBySlug(slug: any): Promise<LinkType> {
    return this.get(`/links/slug/${slug}`);
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

  // ---------- Other ---------- //
  public visits(id: any): Promise<any> {
    return this.get(`/links/${id}/visits`);
  }
}

export default LinkService;
