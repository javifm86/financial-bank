<template>
  <Menu />
  <main aria-live="polite" class="flex-grow flex-shrink-0">
    <router-view />
  </main>
  <Footer />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Menu from '@/layout/Menu.vue'; // @ is an alias to /src
import Footer from '@/layout/Footer.vue'; // @ is an alias to /src

export default defineComponent({
  name: 'App',
  components: {
    Menu,
    Footer
  }
});
</script>
