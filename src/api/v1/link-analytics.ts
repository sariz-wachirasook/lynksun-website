import BaseService from './base';

class LinkAnalyticsService extends BaseService {
  public static instance: LinkAnalyticsService;

  public getMostVisited(params: any): Promise<any> {
    return this.get('/link-analytics/most-visited', params);
  }
}

export default LinkAnalyticsService;
