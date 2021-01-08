import http from '@/utils/http-common';
// import { GetInfo } from './models';

export interface Account {
  id: number;
  alias: string;
  wealth: number;
  operatingLimit: number;
  balance: number;
  currency: string;
}

export interface GetInfo {
  name: string;
  surname: string;
  office: string;
  accountNumber: string;
  clientId: string;
  accounts: Account[];
}

class UserService {
  getInfo() {
    return http.get<GetInfo>('/info');
  }
}

export default new UserService();
