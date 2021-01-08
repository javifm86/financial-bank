import http from '@/utils/http-common';
import { Markets, NewsResponse } from './models/home-services';

class HomeService {
  getMarkets() {
    return http.get<Markets>('/markets');
  }
  getNews() {
    return http.get<NewsResponse>('/lastNews');
  }
}

export default new HomeService();

export { Market, MarketIdUpDown, Markets, News, NewsTag } from './models/home-services';
