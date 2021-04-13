<template>
  <div class="-mx-4 sm:-mx-8 px-4 sm:px-8 overflow-x-auto">
    <div class="inline-block min-w-full shadow sm:rounded-lg border-b border-gray-200 overflow-hidden">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
::v-slotted(table) {
  @apply min-w-full divide-y divide-gray-200;
}
::v-slotted(thead) {
  @apply bg-gray-50;
}
::v-slotted(th) {
  @apply px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider;
}
::v-slotted(tbody) {
  @apply bg-white divide-y divide-gray-200;
}
::v-slotted(td) {
  @apply p-5 text-sm;
}
</style>
