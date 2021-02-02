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
  idAccount: number;
}

export interface Store {
  debug: boolean;
  state: State;
  setAccounts: (newAccounts: Account[]) => void;
  setSelectedAccount: (id: number) => void;
}

const store: Store = {
  debug: true,

  state: reactive<State>({
    accounts: [],
    idAccount: 0
  }),

  setAccounts(newAccounts: Account[]) {
    if (this.debug) {
      console.log('setAccounts triggered with ', newAccounts);
    }

    this.state.accounts = newAccounts;
  },

  setSelectedAccount(id: number) {
    if (this.debug) {
      console.log('setSelectedAccount triggered with ', id);
    }
    this.state.idAccount = id;
  }
};

export default store;
