<template>
  <SectionMenu :elems="menu" class="mb-8" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import SectionMenu, { SectionMenuItem } from '@/components/SectionMenu.vue';

export default defineComponent({
  name: 'MenuWealth',
  components: {
    SectionMenu
  },
  data() {
    const menu: SectionMenuItem[] = [
      {
        link: '/wealth/summary',
        text: 'Summary'
      },
      {
        link: '/wealth/statements',
        text: 'Statements'
      },
      {
        link: '/',
        text: 'Transfers'
      },
      {
        link: '/',
        text: 'Report'
      }
    ];

    return { menu };
  }
});
</script>
