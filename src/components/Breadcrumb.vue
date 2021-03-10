<template>
  <nav class="breadcrumb" aria-label="Breadcrumb">
    <ol class="font-medium text-gray-500 text-lg flex items-center">
      <li v-for="item in elems" :key="item.text">
        <router-link :to="item.link" active-class="text-gray-700">{{ item.text }}</router-link>
      </li>
    </ol>
  </nav>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export interface BreadcrumbItem {
  link: string;
  text: string;
}

export default defineComponent({
  name: 'Breadcrumb',
  props: {
    elems: {
      type: Array as () => BreadcrumbItem[],
      required: true
    }
  }
});
</script>

<style scoped>
nav.breadcrumb li + li::before {
  @apply mx-4 inline-block font-normal text-gray-300;
  content: '/';
}
</style>
