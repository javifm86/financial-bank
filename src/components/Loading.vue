<template>
  <!-- <div class="grid place-content-center"> -->
  <div
    class="loading d-block h-12 w-12 border-gray-900 border-opacity-25 border-4 rounded-full animate-spin"
    :class="$props.class"
  ></div>
  <!-- </div> -->
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Loading'
});
</script>

<style scoped>
.loading {
  border-top-color: theme('colors.blue.800');
}
</style>
