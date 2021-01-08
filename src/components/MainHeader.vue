<template>
  <header class="bg-white shadow">
    <div class="container mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <slot></slot>
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'MainHeader'
});
</script>
