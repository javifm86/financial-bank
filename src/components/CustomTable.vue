<template>
  <div
    class="-mx-4 sm:-mx-8 px-4 sm:px-8 overflow-x-auto"
    :class="[customTdFontSize ? 'custom-td' : 'no-custom-td', customThFontSize ? 'custom-th' : 'no-custom-th']"
  >
    <div class="inline-block min-w-full shadow sm:rounded-lg border-b border-gray-200 overflow-hidden">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'CustomTable',
  props: {
    customTdFontSize: {
      type: Boolean,
      required: false,
      default: false
    },
    customThFontSize: {
      type: Boolean,
      required: false,
      default: false
    }
  }
});
</script>

<style scoped>
::v-slotted(table) {
  @apply min-w-full divide-y divide-gray-200;
}

::v-slotted(thead) {
  @apply bg-gray-50;
}

.no-custom-th ::v-slotted(th) {
  @apply text-xs;
}

::v-slotted(th) {
  @apply px-5 py-3 font-semibold text-gray-500 uppercase tracking-wider;
}

::v-slotted(tbody) {
  @apply bg-white divide-y divide-gray-200;
}

.no-custom-td ::v-slotted(td) {
  @apply text-sm;
}

::v-slotted(td) {
  @apply p-5;
}
</style>
