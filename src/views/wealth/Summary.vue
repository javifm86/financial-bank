<template>
  <MainHeader>
    <h1 class="text-regal-blue text-6xl">Summary financial Wealth</h1>
  </MainHeader>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import MainHeader from '@/components/MainHeader.vue';

export default defineComponent({
  name: 'Home',
  components: {
    MainHeader
  },
  data() {
    return {};
  },
  methods: {},
  created() {
    console.log('created');
  }
});
</script>
