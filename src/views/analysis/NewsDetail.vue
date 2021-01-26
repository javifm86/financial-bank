<template>
  <div class="about">
    <h1 class="text-regal-blue text-6xl">News detail for {{ id }}</h1>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'NewsDetail',
  props: {
    id: {
      type: String,
      required: true
    }
  },
  data() {
    return {};
  }
});
</script>
