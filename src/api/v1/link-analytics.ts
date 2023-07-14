import BaseService from './base';

class LinkAnalyticsService extends BaseService {
  public static instance: LinkAnalyticsService;

  public getMostVisited(params: any): Promise<any> {
    return this.get('/link-analytics/most-visited', params);
  }

  public getTotalVisits(params: any): Promise<any> {
    return this.get('/link-analytics/total-visit-count', params);
  }

  public getTotalVisitsByDate(params: any): Promise<any> {
    return this.get('/link-analytics/total-visits-by-date', params);
  }
}

export default LinkAnalyticsService;
