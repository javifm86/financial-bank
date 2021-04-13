<template>
  <MainHeader>
    <MenuWealth />
    <h1 class="text-3xl font-bold text-gray-900 text-center md:text-left">Statements</h1>
  </MainHeader>
  <div class="container mx-auto py-6 lg:py-10 px-4 sm:px-6 lg:px-8">
    <div
      class="grid sm:grid-cols-2 lg:grid-cols-3 auto-rows-auto sm:auto-rows-fr bg-white rounded-lg overflow-hidden border border-gray-200"
    >
      <div
        class="p-8 border-b sm:border-r border-gray-200 hover:bg-gray-50 cursor-pointer group"
        @click="navigateTo('movements')"
      >
        <div class="text-center">
          <div class="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-blue-100">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 text-blue-700 fill-current" viewBox="0 0 512 512">
              <path
                d="M508.485 168.485l-100.375 100c-4.686 4.686-12.284 4.686-16.97 0l-19.626-19.626c-4.753-4.753-4.675-12.484.173-17.14L422.916 184H12c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h410.916l-51.228-47.719c-4.849-4.656-4.927-12.387-.173-17.14l19.626-19.626c4.686-4.686 12.284-4.686 16.97 0l100.375 100c4.685 4.686 4.685 12.284-.001 16.97zm-504.97 192l100.375 100c4.686 4.686 12.284 4.686 16.97 0l19.626-19.626c4.753-4.753 4.675-12.484-.173-17.14L89.084 376H500c6.627 0 12-5.373 12-12v-24c0-6.627-5.373-12-12-12H89.084l51.228-47.719c4.849-4.656 4.927-12.387.173-17.14l-19.626-19.626c-4.686-4.686-12.284-4.686-16.97 0l-100.375 100c-4.686 4.686-4.686 12.284.001 16.97z"
              />
            </svg>
          </div>
          <h2 class="mb-2 font-semibold text-lg text-gray-900 group-hover:text-blue-600">
            <router-link to="/wealth/movements">Movements</router-link>
          </h2>
          <p class="text-base text-gray-500">Consult your movements between two dates.</p>
        </div>
      </div>
      <div
        class="p-8 border-b lg:border-r border-gray-200 hover:bg-gray-50 cursor-pointer group"
        @click="navigateTo('funds')"
      >
        <div class="text-center">
          <div class="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-blue-100">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 text-blue-700 fill-current" viewBox="0 0 384 512">
              <path
                d="M369.9 97.9L286 14C277 5 264.8-.1 252.1-.1H48C21.5 0 0 21.5 0 48v416c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48V131.9c0-12.7-5.1-25-14.1-34zM332.1 128H256V51.9l76.1 76.1zM48 464V48h160v104c0 13.3 10.7 24 24 24h104v288H48z"
              />
            </svg>
          </div>
          <h2 class="mb-2 font-semibold text-lg text-gray-900 group-hover:text-blue-600">
            <router-link to="/wealth/funds">Funds statements</router-link>
          </h2>
          <p class="text-base text-gray-500">Control your inputs, outputs, valoration and evolution in your funds.</p>
        </div>
      </div>
      <div
        class="p-8 border-b sm:border-r lg:border-r-0 border-gray-200 hover:bg-gray-50 cursor-pointer group"
        @click="navigateTo('tax')"
      >
        <div class="text-center">
          <div class="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-blue-100">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 text-blue-700 fill-current" viewBox="0 0 384 512">
              <path
                d="M296 400h-80c-4.42 0-8 3.58-8 8v16c0 4.42 3.58 8 8 8h80c4.42 0 8-3.58 8-8v-16c0-4.42-3.58-8-8-8zM80 240v96c0 8.84 7.16 16 16 16h192c8.84 0 16-7.16 16-16v-96c0-8.84-7.16-16-16-16H96c-8.84 0-16 7.16-16 16zm32 16h160v64H112v-64zM369.83 97.98L285.94 14.1c-9-9-21.2-14.1-33.89-14.1H47.99C21.5.1 0 21.6 0 48.09v415.92C0 490.5 21.5 512 47.99 512h287.94c26.5 0 48.07-21.5 48.07-47.99V131.97c0-12.69-5.17-24.99-14.17-33.99zM255.95 51.99l76.09 76.08h-76.09V51.99zM336 464.01H47.99V48.09h159.97v103.98c0 13.3 10.7 23.99 24 23.99H336v287.95zM88 112h80c4.42 0 8-3.58 8-8V88c0-4.42-3.58-8-8-8H88c-4.42 0-8 3.58-8 8v16c0 4.42 3.58 8 8 8zm0 64h80c4.42 0 8-3.58 8-8v-16c0-4.42-3.58-8-8-8H88c-4.42 0-8 3.58-8 8v16c0 4.42 3.58 8 8 8z"
              />
            </svg>
          </div>

          <h2 class="mb-2 font-semibold text-lg text-gray-900 group-hover:text-blue-600">
            <router-link to="/wealth/tax">Tax information</router-link>
          </h2>
          <p class="text-base text-gray-500">
            Information for the income statement. Tributary information, investment fund performance...
          </p>
        </div>
      </div>
      <div
        class="p-8 border-b lg:border-b-0 lg:border-r border-gray-200 hover:bg-gray-50 cursor-pointer group"
        @click="navigateTo('comissions')"
      >
        <div class="text-center">
          <div class="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-blue-100">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 text-blue-700 fill-current" viewBox="0 0 512 512">
              <path
                d="M341.65 181.65l-11.31-11.31c-6.25-6.25-16.38-6.25-22.63 0L170.35 307.72c-6.25 6.25-6.25 16.38 0 22.63l11.31 11.31c6.25 6.25 16.38 6.25 22.63 0l137.37-137.37c6.24-6.26 6.24-16.39-.01-22.64zM192 224c17.67 0 32-14.33 32-32s-14.33-32-32-32-32 14.33-32 32 14.33 32 32 32zm128 64c-17.67 0-32 14.33-32 32s14.33 32 32 32 32-14.33 32-32-14.33-32-32-32zm192-32c0-36.5-18.8-68.4-46.7-86.7 6.8-32.9-2.7-68.7-28.3-94.3-25.6-25.7-61.5-35.1-94.3-28.3C324.2 18.7 292.3 0 256 0s-68.3 18.7-86.7 46.7C136.4 39.9 100.6 49.4 75 75c-25.7 25.6-35.1 61.5-28.3 94.3C18.6 187.8 0 219.8 0 256c0 36.3 18.7 68.3 46.7 86.7-6.8 32.9 2.7 68.7 28.3 94.3 25.6 25.7 61.2 35.1 94.3 28.3 18.5 28.1 50.5 46.7 86.7 46.7 36.4 0 68.3-18.8 86.7-46.7 33.1 6.8 68.7-2.7 94.3-28.3 25.7-25.6 35.1-61.5 28.3-94.3 28.1-18.5 46.7-50.5 46.7-86.7zm-108.3 61.3c9.1 19.9 30.3 54.8-.7 85.8-28 28-55.3 14.5-85.8.7-7.7 20.6-17.3 60.2-61.2 60.2-45.3 0-54.7-42.8-61.2-60.2-21.1 9.6-54.9 30.2-85.9-.8-32-32-8.4-68.9-.7-85.8C87.6 309.5 48 299.9 48 256c0-45.3 42.8-54.7 60.3-61.3-9.1-19.9-30.3-54.8.7-85.8 32-32 68.9-8.4 85.8-.7C202.5 87.6 212.1 48 256 48c45.3 0 54.7 42.8 61.2 60.4 19.9-9.1 54.8-30.3 85.8.7 32 32 8.4 68.9.7 85.8 20.6 7.7 60.2 17.3 60.2 61.2 0 45.3-42.8 54.7-60.2 61.2z"
              />
            </svg>
          </div>
          <h2 class="mb-2 font-semibold text-lg text-gray-900 group-hover:text-blue-600">
            <router-link to="/wealth/comissions">Bank comissions</router-link>
          </h2>
          <p class="text-base text-gray-500">Yearly summary of commissions applied.</p>
        </div>
      </div>
      <div
        class="p-8 border-b sm:border-b-0 sm:border-r border-gray-200 hover:bg-gray-50 cursor-pointer group"
        @click="navigateTo('gainslosses')"
      >
        <div class="text-center">
          <div class="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-blue-100">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 text-blue-700 fill-current" viewBox="0 0 512 512">
              <path
                d="M117.65 277.65c6.25 6.25 16.38 6.25 22.63 0L192 225.94l84.69 84.69c6.25 6.25 16.38 6.25 22.63 0L409.54 200.4l29.49 29.5c15.12 15.12 40.97 4.41 40.97-16.97V112c0-8.84-7.16-16-16-16H363.07c-21.38 0-32.09 25.85-16.97 40.97l29.5 29.49-87.6 87.6-84.69-84.69c-6.25-6.25-16.38-6.25-22.63 0l-74.34 74.34c-6.25 6.25-6.25 16.38 0 22.63l11.31 11.31zM496 400H48V80c0-8.84-7.16-16-16-16H16C7.16 64 0 71.16 0 80v336c0 17.67 14.33 32 32 32h464c8.84 0 16-7.16 16-16v-16c0-8.84-7.16-16-16-16z"
              />
            </svg>
          </div>
          <h2 class="mb-2 font-semibold text-lg text-gray-900 group-hover:text-blue-600">
            <router-link to="/wealth/gainslosses">Capital gains and losses</router-link>
          </h2>
          <p class="text-base text-gray-500">Final report of the returns of your different assets.</p>
        </div>
      </div>
      <div class="p-8 border-gray-200 hover:bg-gray-50 cursor-pointer group" @click="navigateTo('cfds')">
        <div class="text-center">
          <div class="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-blue-100">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 text-blue-700 fill-current" viewBox="0 0 384 512">
              <path
                d="M288 248v28c0 6.6-5.4 12-12 12H108c-6.6 0-12-5.4-12-12v-28c0-6.6 5.4-12 12-12h168c6.6 0 12 5.4 12 12zm-12 72H108c-6.6 0-12 5.4-12 12v28c0 6.6 5.4 12 12 12h168c6.6 0 12-5.4 12-12v-28c0-6.6-5.4-12-12-12zm108-188.1V464c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V48C0 21.5 21.5 0 48 0h204.1C264.8 0 277 5.1 286 14.1L369.9 98c9 8.9 14.1 21.2 14.1 33.9zm-128-80V128h76.1L256 51.9zM336 464V176H232c-13.3 0-24-10.7-24-24V48H48v416h288z"
              />
            </svg>
          </div>
          <h2 class="mb-2 font-semibold text-lg text-gray-900 group-hover:text-blue-600">
            <router-link to="/wealth/cfds">Breakdown CFDs</router-link>
          </h2>
          <p class="text-base text-gray-500">Breakdown of adjustments made in your operations with CFDs.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import MainHeader from '@/components/MainHeader.vue';
import MenuWealth from './MenuWealth.vue';

export default defineComponent({
  name: 'Statements',
  components: {
    MainHeader,
    MenuWealth
  },
  methods: {
    navigateTo(id: string) {
      this.$router.push({ path: `/wealth/${id}` });
    }
  }
});
</script>
