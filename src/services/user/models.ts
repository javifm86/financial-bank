interface Account {
  id: number;
  alias: string;
}

export interface GetInfo {
  name: string;
  surname: string;
  office: string;
  accountNumber: string;
  clientId: string;
  accounts: Account;
}
