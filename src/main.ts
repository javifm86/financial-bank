import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './assets/css/tailwind.css';
import config from '@/config/config';
import { Config } from '@/config/models/config';
import GlobalMethods, { Methods } from '@/utils/methods';

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $config: Config;
    $methods: Methods;
  }
}

const app = createApp(App).use(router);

app.config.globalProperties.$config = config;
app.config.globalProperties.$methods = GlobalMethods;

app.mount('#app');
