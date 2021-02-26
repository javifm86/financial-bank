import http from '@/utils/http-common';

export interface Summary {
  id: number;
  total: number;
  currency: string;
  compositions: Composition[];
  graphs: Graph;
  evolution: Evolution[];
  operatingLimit: OperatingLimit;
}

interface Composition {
  name: string;
  value: number;
  percentage: number;
  currency: string;
}

export interface Graph {
  active: GraphItem[];
  product: GraphItem[];
  geographic: GraphItem[];
}

interface GraphItem {
  description: number;
  percentage: number;
}

export interface Evolution {
  currency: string;
  dateValue: string;
  value: number;
  total: number;
}

export interface OperatingLimit {
  exchange: LimitItem;
  cfds: LimitItem;
  derivatives: LimitItem;
  forex: LimitItem;
  funds: LimitItem;
  plans: LimitItem;
  transfers: LimitItem;
}

interface LimitItem {
  limit: number;
  currency: string;
}

class WealthService {
  getSummary(idAccount: number) {
    return http.get<Summary>(`/wealthSummary/${idAccount}`);
  }
}

export default new WealthService();
