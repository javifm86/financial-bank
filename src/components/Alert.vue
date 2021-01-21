<template>
  <div
    class="p-4 border-l-4 rounded bg-white flex"
    :class="{
      'border-green-500': kind === 'success',
      'border-yellow-500': kind === 'warning',
      'border-red-500': kind === 'error',
      'border-blue-500': kind === 'info',
      'items-center': iconAlign === 'center',
      'alert border-b border-r border-t': bordered
    }"
  >
    <span
      v-if="icon"
      class="rounded-full w-8 h-8 grid place-content-center mr-4"
      data-test="icon"
      :class="{
        'bg-green-500': kind === 'success',
        'bg-yellow-500': kind === 'warning',
        'bg-red-500': kind === 'error',
        'bg-blue-500': kind === 'info'
      }"
    >
      <svg
        v-if="kind === 'success'"
        xmlns="http://www.w3.org/2000/svg"
        class="w-5 h-5 text-white fill-current"
        viewBox="0 0 512 512"
      >
        <path
          d="M435.848 83.466L172.804 346.51l-96.652-96.652c-4.686-4.686-12.284-4.686-16.971 0l-28.284 28.284c-4.686 4.686-4.686 12.284 0 16.971l133.421 133.421c4.686 4.686 12.284 4.686 16.971 0l299.813-299.813c4.686-4.686 4.686-12.284 0-16.971l-28.284-28.284c-4.686-4.686-12.284-4.686-16.97 0z"
        />
      </svg>
      <svg
        v-if="kind === 'info'"
        xmlns="http://www.w3.org/2000/svg"
        class="h-4 text-white fill-current"
        viewBox="0 0 192 512"
      >
        <path
          d="M20 424.229h20V279.771H20c-11.046 0-20-8.954-20-20V212c0-11.046 8.954-20 20-20h112c11.046 0 20 8.954 20 20v212.229h20c11.046 0 20 8.954 20 20V492c0 11.046-8.954 20-20 20H20c-11.046 0-20-8.954-20-20v-47.771c0-11.046 8.954-20 20-20zM96 0C56.235 0 24 32.235 24 72s32.235 72 72 72 72-32.235 72-72S135.764 0 96 0z"
        />
      </svg>
      <svg
        v-if="kind === 'warning'"
        xmlns="http://www.w3.org/2000/svg"
        class="h-4 text-white fill-current"
        viewBox="0 0 192 512"
      >
        <path
          d="M176 432c0 44.112-35.888 80-80 80s-80-35.888-80-80 35.888-80 80-80 80 35.888 80 80zM25.26 25.199l13.6 272C39.499 309.972 50.041 320 62.83 320h66.34c12.789 0 23.331-10.028 23.97-22.801l13.6-272C167.425 11.49 156.496 0 142.77 0H49.23C35.504 0 24.575 11.49 25.26 25.199z"
        />
      </svg>
      <svg
        v-if="kind === 'error'"
        xmlns="http://www.w3.org/2000/svg"
        class="h-4 text-white fill-current"
        viewBox="0 0 352 512"
      >
        <path
          d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"
        />
      </svg>
    </span>
    <div>
      <div class="font-bold text-lg" data-test="title">{{ finalTitle }}</div>
      <p v-html="message" data-test="msg"></p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export type Type = 'success' | 'info' | 'warning' | 'error';
export type Align = 'top' | 'center';

export default defineComponent({
  name: 'Alert',
  props: {
    kind: {
      type: String as () => Type,
      required: true
    },
    message: {
      type: String,
      required: true
    },
    icon: {
      type: Boolean,
      required: false,
      default: true
    },
    bordered: {
      type: Boolean,
      required: false,
      default: false
    },
    iconAlign: {
      type: String as () => Align,
      required: false,
      default: 'center'
    },
    title: {
      type: String,
      required: false
    }
  },
  data() {
    return {
      defaultTitle: {
        success: 'Success',
        warning: 'Warning',
        info: 'Info',
        error: 'Error'
      } as { [key in Type]: string }
    };
  },
  computed: {
    finalTitle(): string {
      return this.title == null ? this.defaultTitle[this.kind] : this.title;
    }
  }
});
</script>

<style scoped>
.alert {
  border-top-color: theme('colors.gray.200');
  border-bottom-color: theme('colors.gray.200');
  border-right-color: theme('colors.gray.200');
}
</style>
