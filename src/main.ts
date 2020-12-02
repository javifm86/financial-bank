import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './assets/css/tailwind.css';
import config from '@/config/config';
import { Config } from '@/config/models/config';

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $config: Config;
  }
}

const app = createApp(App).use(router);

app.config.globalProperties.$config = config;

app.mount('#app');
