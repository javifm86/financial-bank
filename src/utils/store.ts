import { reactive } from 'vue';

interface Account {
  id: number;
  alias: string;
  wealth: number;
  operatingLimit: number;
  balance: number;
  currency: string;
}

interface State {
  accounts: Account[];
  accountSelected: Account;
}

export interface Store {
  debug: boolean;
  state: State;
  setAccounts: (newAccounts: Account[]) => void;
  setSelectedAccount: (account: Account) => void;
}

const store: Store = {
  debug: true,

  state: reactive<State>({
    accounts: [],
    accountSelected: {} as Account
  }),

  setAccounts(newAccounts: Account[]) {
    if (this.debug) {
      console.log('setAccounts triggered with ', newAccounts);
    }

    this.state.accounts = newAccounts;
  },

  setSelectedAccount(account: Account) {
    if (this.debug) {
      console.log('setSelectedAccount triggered with ', account);
    }
    this.state.accountSelected = account;
  }
};

export default store;
