<template>
  <select class="w-full" @change="update()" v-if="accounts.length" v-model="selected">
    <option v-for="elem in accounts" :key="elem.id" :value="elem.id">{{ elem.alias }}</option>
  </select>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import store from '@/utils/store';
import userService from '@/services/user/user';

export default defineComponent({
  name: 'AccountSelector',
  data() {
    return {
      selected: store.state.idAccount
    };
  },
  computed: {
    accounts() {
      return store.state.accounts;
    },
    selectedStore() {
      return store.state.idAccount;
    }
  },
  watch: {
    selectedStore(newValue) {
      this.selected = newValue;
    }
  },
  methods: {
    update(): void {
      console.warn(this.selected);
      store.setSelectedAccount(this.selected);
    }
  },
  created() {
    if (!this.accounts.length) {
      userService
        .getInfo()
        .then((response) => {
          const selectedAccount = response.data.accounts[0].id;
          store.setAccounts(response.data.accounts);
          store.setSelectedAccount(selectedAccount);
          // TODO: ¿Mover al servicio directamente?
        })
        .catch((e) => {
          console.warn(e);
        });
      //   .finally(() => {

      //   });
    }
  }
});
</script>
