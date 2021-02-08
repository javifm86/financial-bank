import http from '@/utils/http-common';

export interface Summary {
  id: number;
  total: number;
  currency: string;
  compositions: Composition[];
  graphs: Graph;
  evolution: Evolution[];
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

interface Evolution {
  dateValue: string;
  value: number;
  total: number;
}

class WealthService {
  getSummary(idAccount: number) {
    return http.get<Summary>(`/wealthSummary/${idAccount}`);
  }
}

export default new WealthService();
