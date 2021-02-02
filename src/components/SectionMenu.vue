<template>
  <nav class="pb-4 pt-2 border-b border-gray-200 text-gray-400 font-semibold overflow-x-auto">
    <ul class="flex">
      <li v-for="item in elems" :key="item.text">
        <router-link
          :to="item.link"
          class="py-4 px-3 border-b-2 border-transparent hover:border-gray-300 transition-colors duration-300"
          active-class="border-b-2 border-blue-500 hover:border-blue-500 text-gray-900"
          >{{ item.text }}</router-link
        >
      </li>
    </ul>
  </nav>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export interface SectionMenuItem {
  link: string;
  text: string;
}

export default defineComponent({
  name: 'SectionMenu',
  props: {
    elems: {
      type: Array as () => SectionMenuItem[],
      required: true
    }
  },
  data() {
    return {};
  }
});
</script>
