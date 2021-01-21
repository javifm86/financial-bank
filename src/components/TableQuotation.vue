<template>
  <div class="-mx-4 sm:-mx-8 px-4 sm:px-8 overflow-x-auto">
    <div class="inline-block min-w-full shadow sm:rounded-lg border-b border-gray-200 overflow-hidden">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider text-left">Name</th>
            <th class="px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Last</th>
            <th class="px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Dif.</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="elem in elems" :key="elem.name">
            <td class="px-5 py-5 text-sm text-left">{{ elem.name }}</td>
            <td class="px-5 py-5 text-sm text-right">{{ elem.last }}</td>
            <td class="px-5 py-5 text-sm text-right" :class="elem.className">
              {{ elem.dif }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export interface ElemQuotation {
  name: string;
  last: string;
  dif: string;
  className: string;
}

export default defineComponent({
  name: 'TableQuotation',
  props: {
    elems: {
      type: Array as () => ElemQuotation[],
      required: true
    }
  }
});
</script>
