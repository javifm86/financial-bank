<template>
  <Menu />
  <main aria-live="polite" class="flex-grow flex-shrink-0">
    <router-view v-if="initialInfoLoaded" />
    <div v-else class="py-6 grid place-content-center">
      <Loading />
    </div>
  </main>
  <Footer />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Menu from '@/layout/Menu.vue'; // @ is an alias to /src
import Footer from '@/layout/Footer.vue'; // @ is an alias to /src
import Loading from '@/components/Loading.vue';
import userService from '@/services/user/user';
import store from '@/utils/store';
import { setOptions } from 'highcharts';

export default defineComponent({
  name: 'App',
  components: {
    Menu,
    Footer,
    Loading
  },
  data() {
    return {
      initialInfoLoaded: false
    };
  },
  created() {
    setOptions({
      credits: {
        enabled: false
      }
    });

    userService
      .getInfo()
      .then((response) => {
        const selectedAccount = response.data.accounts[0];
        store.setAccounts(response.data.accounts);
        store.setSelectedAccount(selectedAccount);
      })
      .catch((e) => {
        console.warn(e);
      })
      .finally(() => {
        this.initialInfoLoaded = true;
      });
  }
});
</script>
