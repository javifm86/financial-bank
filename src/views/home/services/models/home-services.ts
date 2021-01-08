export interface Market {
  id?: string;
  name: string;
  last: number;
  dif: number;
}

export interface MarketIdUpDown {
  id: string;
  name: string;
  ups: Market[];
  downs: Market[];
}

export interface Markets {
  list: Market[];
  updowns: MarketIdUpDown[];
}

export interface NewsResponse {
  news: News[];
}

export interface News {
  id: number;
  author: string;
  tag: NewsTag;
  title: string;
  intro: string;
  full: string;
  img: string;
  date: string;
}

export type NewsTag = 'latest' | 'markets' | 'opinion';
