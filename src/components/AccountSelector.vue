<template>
  <select class="w-full" @change="update()" v-if="accounts.length" v-model="selected">
    <option v-for="elem in accounts" :key="elem.id" :value="elem.id">{{ elem.alias }}</option>
  </select>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import store from '@/utils/store';

export default defineComponent({
  name: 'AccountSelector',
  emits: ['selected'],
  data() {
    return {
      selected: store.state.accountSelected.id
    };
  },
  computed: {
    accounts() {
      return store.state.accounts;
    },
    selectedStore() {
      return store.state.accountSelected.id;
    }
  },
  watch: {
    selectedStore(newValue) {
      this.selected = newValue;
    }
  },
  methods: {
    update(): void {
      const selectedAccount = this.accounts.find((elem) => elem.id === this.selected);
      if (selectedAccount != null) {
        store.setSelectedAccount(selectedAccount);
        this.$emit('selected', this.selected);
      }
    }
  }
});
</script>
