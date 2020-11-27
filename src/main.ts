import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './assets/css/tailwind.css';
import development from '@/config/development';
import production from '@/config/production';

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $config: Record<string, unknown>;
  }
}

const app = createApp(App).use(router);

app.config.globalProperties.$config =
  process.env.NODE_ENV === 'production' ? Object.freeze(production) : Object.freeze(development);

app.mount('#app');
