import http from '@/utils/http-common';

export interface Movements {
  wealthSituation: ElemWealthSituation[];
  wealthEvolution: WealthEvolution;
  benchmarkEvolution: ItemBenchmarkEvolution[];
  portfolioExchange: ItemPortfolioExchange[];
  portfolioFunds: ItemFundsPlans[];
  portfolioPlans: ItemFundsPlans[];
  movements: ItemMovements[];
}
export interface ElemWealthSituation {
  des: string;
  ini: number;
  end: number;
  currency: string;
}

interface WealthEvolution {
  balanceInitial: number;
  balanceEnd: number;
  contributions: number;
  contributionsCash: number;
  contributionsEntryTransfer: number;
  withdrawal: number;
  withdrawalCash: number;
  withdrawalOutputTransfer: number;
  distributionsWithHoldingFunds: number;
  profit: number;
}

interface ItemBenchmarkEvolution {
  name: string;
  endValue: number;
  month: number;
  year: number;
}

interface ItemPortfolioExchange {
  name: string;
  titles: number;
  endValue: number;
}

interface ItemFundsPlans {
  name: string;
  shares: number;
  endValue: number;
  gainLosses: number;
}

interface ItemMovements {
  concept: string;
  date: string;
  movement: number;
  balance: number;
}

class StatementsService {
  getMovements() {
    return http.get<Movements>('/movements');
  }
}

export default new StatementsService();
