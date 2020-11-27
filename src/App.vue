<template>
  <Menu />
  <header class="bg-white shadow">
    <div class="container mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <h1 class="text-3xl font-bold leading-tight text-gray-900">Hello world</h1>
    </div>
  </header>
  <main aria-live="polite" class="container mx-auto py-6 px-4 sm:px-6 lg:px-8 flex-grow flex-shrink-0">
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
