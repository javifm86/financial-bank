<template>
  <div class="bg-gray-800">
    <div class="container mx-auto text-gray-200 py-12 px-4 sm:px-6 lg:px-8 flex-shrink-0">
      <div class="text-center">&copy;2020 Financial Bank. All rights reserved.</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Footer',
  props: { msg: String }
});
</script>
