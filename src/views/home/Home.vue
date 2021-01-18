<template>
  <MainHeader v-if="!loadingUserInfo">
    <div class="flex flex-col md:flex-row justify-between items-center">
      <div class="mb-6 md:mb-0">
        <h1 class="text-3xl font-bold text-gray-900 mb-3 text-center md:text-left">Welcome, {{ name }}</h1>
        <div>
          <div class="flex flex-col sm:flex-row items-center">
            <div class="flex mr-0 mb-3 sm:mb-0 sm:mr-8">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 mr-2 text-gray-400 fill-current" viewBox="0 0 384 512">
                <path
                  d="M192 96c-52.935 0-96 43.065-96 96s43.065 96 96 96 96-43.065 96-96-43.065-96-96-96zm0 160c-35.29 0-64-28.71-64-64s28.71-64 64-64 64 28.71 64 64-28.71 64-64 64zm0-256C85.961 0 0 85.961 0 192c0 77.413 26.97 99.031 172.268 309.67 9.534 13.772 29.929 13.774 39.465 0C357.03 291.031 384 269.413 384 192 384 85.961 298.039 0 192 0zm0 473.931C52.705 272.488 32 256.494 32 192c0-42.738 16.643-82.917 46.863-113.137S149.262 32 192 32s82.917 16.643 113.137 46.863S352 149.262 352 192c0 64.49-20.692 80.47-160 281.931z"
                />
              </svg>
              <span class="text-gray-400 font-semibold">{{ office }}</span>
            </div>
            <div class="flex">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-6 h-6 mr-2 text-gray-400 fill-current"
                viewBox="0 0 512 512"
              >
                <path
                  d="M384 256c-17.67 0-32 14.33-32 32s14.33 32 32 32 32-14.33 32-32-14.33-32-32-32zm80-160h-16V80c0-26.51-21.49-48-48-48H96C42.98 32 0 74.98 0 128v256c0 53.02 42.98 96 96 96h352c35.35 0 64-28.65 64-64V144c0-26.51-21.49-48-48-48zm16 320c0 17.64-14.36 32-32 32H96c-35.29 0-64-28.71-64-64V128c0-35.29 28.71-64 64-64h304c8.82 0 16 7.18 16 16v16H112c-8.84 0-16 7.16-16 16s7.16 16 16 16h352c8.82 0 16 7.18 16 16v272z"
                />
              </svg>
              <span class="text-gray-400 font-semibold">{{ accountNumber }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="w-full sm:w-auto">
        <select class="w-full">
          <option v-for="elem in accounts" :key="elem.id">{{ elem.alias }}</option>
        </select>
      </div>
    </div>
  </MainHeader>
  <div class="container mx-auto py-6 px-4 sm:px-6 lg:px-8">
    <div v-if="loadingUserInfo && loadingMarketInfo && loadingNews" class="grid place-content-center">
      <Loading />
    </div>
    <div class="mt-4" v-else>
      <h2 class="text-xl font-semibold text-gray-800 mb-3">Overview</h2>
      <div class="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mb-8">
        <div class="bg-white overflow-hidden rounded-xl shadow">
          <div class="flex items-center p-8">
            <!-- prettier-ignore -->
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 mr-2 text-gray-400 fill-current" viewBox="0 0 640 512"><path d="M634.4 279.09L525.35 103.12C522.18 98.38 517.09 96 512 96s-10.18 2.38-13.35 7.12L389.6 279.09c-3.87 5.78-6.09 12.72-5.51 19.64C389.56 364.4 444.74 416 512 416s122.44-51.6 127.91-117.27c.58-6.92-1.64-13.86-5.51-19.64zM512 384c-41.58 0-77.55-27.13-90.78-64h181.2C589 357.23 553.28 384 512 384zm-90.27-96l90.31-145.76L602.98 288H421.73zM536 480H336V125.74c27.56-7.14 48-31.95 48-61.74h152c4.42 0 8-3.58 8-8V40c0-4.42-3.58-8-8-8H374.89c-.15-.26-4.37-11.11-19.11-21.07C345.57 4.03 333.25 0 320 0s-25.57 4.03-35.78 10.93c-14.74 9.96-18.96 20.81-19.11 21.07H104c-4.42 0-8 3.58-8 8v16c0 4.42 3.58 8 8 8h152c0 29.79 20.44 54.6 48 61.74V480H104c-4.42 0-8 3.58-8 8v16c0 4.42 3.58 8 8 8h432c4.42 0 8-3.58 8-8v-16c0-4.42-3.58-8-8-8zM288 64c0-17.67 14.33-32 32-32s32 14.33 32 32-14.33 32-32 32-32-14.33-32-32zm-32.09 234.73c.58-6.92-1.64-13.86-5.51-19.64L141.35 103.12C138.18 98.38 133.09 96 128 96s-10.18 2.38-13.35 7.12L5.6 279.09c-3.87 5.78-6.09 12.72-5.51 19.64C5.56 364.4 60.74 416 128 416s122.44-51.6 127.91-117.27zM128.04 142.24L218.98 288H37.73l90.31-145.76zM37.22 320h181.2C205 357.23 169.28 384 128 384c-41.58 0-77.55-27.13-90.78-64z" /></svg>
            <div class="ml-6">
              <h3 class="text-gray-400 font-semibold">Account balance</h3>
              <div class="text-gray-900 text-2xl">{{ balance }}</div>
            </div>
          </div>
          <div class="bg-gray-50 px-8 py-3">
            <a href="#" class="text-blue-600 hover:underline">Add</a>
          </div>
        </div>
        <div class="bg-white overflow-hidden rounded-xl shadow">
          <div class="flex items-center p-8">
            <!-- prettier-ignore -->
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 mr-2 text-gray-400 fill-current" viewBox="0 0 512 512"><path d="M336 32c-48.6 0-92.6 9-124.5 23.4-.9.4-51.5 21-51.5 56.6v16.7C76.1 132.2 0 163.4 0 208v192c0 44.2 78.8 80 176 80s176-35.8 176-80v-16.4c89.7-3.7 160-37.9 160-79.6V112c0-37-62.1-80-176-80zm-16 368c0 13.9-50.5 48-144 48S32 413.9 32 400v-50.1c31.8 20.6 84.4 34.1 144 34.1s112.2-13.5 144-34.1V400zm0-96c0 13.9-50.5 48-144 48S32 317.9 32 304v-50.1c31.8 20.6 84.4 34.1 144 34.1s112.2-13.5 144-34.1V304zm-144-48c-81 0-146.7-21.5-146.7-48S95 160 176 160s146.7 21.5 146.7 48S257 256 176 256zm304 48c0 13.1-45 43.6-128 47.3v-64.1c52.8-2.2 99.1-14.6 128-33.3V304zm0-96c0 13.1-45.1 43.4-128 47.2V208c0-5.6-1.7-11-4.1-16.3 54.6-1.7 102.4-14.5 132.1-33.8V208zm-144-48c-7.3 0-14-.5-20.9-.9-36.9-21.7-85-28.2-115.6-30-6.3-5.3-10.1-11-10.1-17.1 0-26.5 65.7-48 146.7-48s146.7 21.5 146.7 48S417 160 336 160z" /></svg>
            <div class="ml-6">
              <h3 class="text-gray-400 font-semibold">Financial wealth</h3>
              <div class="text-gray-900 text-2xl">{{ wealth }}</div>
            </div>
          </div>
          <div class="bg-gray-50 px-8 py-3">
            <a href="#" class="text-blue-600 hover:underline">Breawdown</a>
          </div>
        </div>
        <div class="bg-white overflow-hidden rounded-xl shadow">
          <div class="flex items-center p-8">
            <!-- prettier-ignore -->
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 mr-2 text-gray-400 fill-current" viewBox="0 0 640 512"><path d="M640 144c0-26.8-21.9-48.4-48.8-48-26 .4-47.2 23.7-47.2 49.7v137.1l-62 73.3c-7.1 8.4-20.1-1.7-13.6-10.7l28.6-39.3c13.4-18.5 13.1-44.6-2.5-61.3-25.5-27.4-60.6-15.3-74.5 3.9l-42.4 58.4C361 329.3 352 356.3 352 384v120c0 4.4 3.6 8 8 8h16c4.4 0 8-3.6 8-8V384c0-20.6 6.8-41.1 19.5-58l42.4-58.4c5.3-7.3 15.3-8.7 22.4-3.5 7.8 5.6 8.3 15.8 3.5 22.3l-30.6 42.2c-.2.3-.4.5-.5.8-26.1 39.7 33.9 86.7 70.8 42.4l64.6-77.5V144.6c0-22.3 32-21.7 32-.7v170.4c0 3.6-1.2 7.2-3.5 10L497.6 458c-9.5 11.9-15.5 29.2-17.1 45.2-.5 4.8 3.2 8.7 8 8.7h16c4 0 7.5-2.9 8-6.9 1.2-9.6 4.6-20.2 10.1-27l107-133.7c6.8-8.5 10.5-19.1 10.5-30L640 144zM220 248.8c-14-19.2-49.1-31.4-74.5-3.9-15.6 16.8-15.9 42.8-2.5 61.3l28.6 39.3c6.5 8.9-6.5 19.1-13.6 10.7l-62-73.3V145.8c0-26-21.2-49.3-47.2-49.7C21.9 95.6 0 117.2 0 144v170.4c0 10.9 3.7 21.5 10.5 30l107 133.7c5.4 6.8 8.9 17.5 10.1 27 .5 4 4 6.9 8 6.9h16c4.8 0 8.5-3.9 8-8.7-1.6-16-7.5-33.3-17.1-45.2l-107-133.7c-2.3-2.8-3.5-6.4-3.5-10V144c0-21 32-21.6 32 .7v149.7l64.6 77.5c36.9 44.2 96.8-2.7 70.8-42.4-.2-.3-.4-.5-.5-.8l-30.6-42.2c-4.7-6.5-4.2-16.7 3.5-22.3 7-5.1 17.1-3.8 22.4 3.5l42.4 58.4c12.7 16.9 19.5 37.4 19.5 58v120c0 4.4 3.6 8 8 8h16c4.4 0 8-3.6 8-8v-120c0-27.7-9-54.6-25.6-76.8L220 248.8zm169.1-60c10.1-29.6-7.3-59.8-35.1-67.8l-59.1-16.9c-8.8-2.5-14.9-10.6-14.9-19.7 0-11.3 9.2-20.5 20.5-20.5h36.9c8.2 0 16.1 2.6 22.6 7.3 3 2.2 7.2 1.5 9.8-1.2l11.4-11.4c3.5-3.5 2.9-9.2-1-12.2C368 37.1 353.1 32 337.4 32H336V8c0-4.4-3.6-8-8-8h-16c-4.4 0-8 3.6-8 8v24h-3.5c-30.6 0-55.1 26.3-52.2 57.5 2.1 22.2 19.1 40.1 40.5 46.2l56.4 16.1c8.8 2.5 14.9 10.6 14.9 19.7 0 11.3-9.2 20.5-20.5 20.5h-36.9c-8.2 0-16.1-2.6-22.6-7.3-3-2.2-7.2-1.5-9.8 1.2l-11.4 11.4c-3.5 3.5-2.9 9.2 1 12.2 12.3 9.4 27.2 14.5 42.9 14.5h1.4v24c0 4.4 3.6 8 8 8h16c4.4 0 8-3.6 8-8v-24h1.4c22.6 0 44.1-13.6 51.5-35.2z"/></svg>
            <div class="ml-6">
              <h3 class="text-gray-400 font-semibold">Operating limit</h3>
              <div class="text-gray-900 text-2xl">{{ operatingLimit }}</div>
            </div>
          </div>
          <div class="bg-gray-50 px-8 py-3">
            <a href="#" class="text-blue-600 hover:underline">Consult</a>
          </div>
        </div>
      </div>

      <div class="grid gap-8 gap-y-0 grid-cols-1 lg:grid-cols-2 mb-8">
        <div>
          <h2 class="text-xl font-semibold text-gray-800 mb-3">Markets</h2>
          <TableQuotation :elems="markets" />
        </div>
        <div>
          <h2 class="text-xl font-semibold text-gray-800 mb-3">Ups and downs in {{ marketName }}</h2>
          <TableQuotation :elems="drawUpsDowns" />
        </div>
      </div>

      <h2 class="text-xl font-semibold text-gray-800 mb-3">News</h2>
      <div
        class="grid gap-x-8 gap-y-12 grid-cols-1 lg:grid-cols-3 mb-8 bg-white rounded-xl px-4 py-8 shadow divide-y divide-gray-200 lg:divide-y-0"
      >
        <article v-for="(item, index) in lastNews" :key="item.id" class="lg:pt-0" :class="{ 'pt-8': index > 0 }">
          <div class="inline-block px-2 py-1 font-semibold rounded-xl mb-4 text-sm" :class="item.className">
            {{ item.tag }}
          </div>
          <h3 class="text-2xl font-semibold mb-5">{{ item.title }}</h3>
          <p class="text-gray-500 text-lg mb-6">{{ item.intro }}</p>
          <div class="flex">
            <div class="flex-shrink-0 w-12 h-12">
              <img class="w-full h-full rounded-full" :src="getAvatar(item.img)" alt="" />
            </div>
            <div class="ml-3">
              <p class="text-gray-900 font-bold whitespace-no-wrap">{{ item.author }}</p>
              <p class="text-gray-600 whitespace-no-wrap">{{ item.date }}</p>
            </div>
          </div>
        </article>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import userService, { GetInfo, Account } from '@/services/user/user';
import homeService, { MarketIdUpDown, Market, News, NewsTag } from './services/home';
import MainHeader from '@/components/MainHeader.vue';
import Loading from '@/components/Loading.vue';
import TableQuotation, { ElemQuotation } from '@/components/TableQuotation.vue';

export default defineComponent({
  name: 'Home',
  components: {
    MainHeader,
    Loading,
    TableQuotation
  },
  data() {
    return {
      loadingUserInfo: true,
      loadingMarketInfo: true,
      loadingNews: true,
      initialLoad: true,
      name: '',
      office: '',
      accountNumber: '',
      wealth: '',
      operatingLimit: '',
      balance: '',
      marketId: '',
      marketName: '',
      upDowns: {} as MarketIdUpDown | undefined,
      drawUpsDowns: [] as ElemQuotation[],
      markets: [] as ElemQuotation[],
      marketsUpsDowns: [] as MarketIdUpDown[],
      lastNews: [] as {
        id: number;
        author: string;
        title: string;
        intro: string;
        tag: NewsTag;
        img: string;
        className: string;
        date: string;
      }[],
      accounts: [] as Account[]
    };
  },
  methods: {
    initUserInfo(data: GetInfo) {
      this.name = `${data.name} ${data.surname}`;
      this.accounts = data.accounts;
      this.office = data.office;
      this.accountNumber = data.accountNumber;
      this.wealth = this.$methods.formatCurrency(data.accounts[0].wealth, data.accounts[0].currency);
      this.operatingLimit = this.$methods.formatCurrency(data.accounts[0].operatingLimit, data.accounts[0].currency);
      this.balance = this.$methods.formatCurrency(data.accounts[0].balance, data.accounts[0].currency);
    },
    formatMarket(elem: Market): ElemQuotation {
      return {
        name: elem.name,
        last: this.$methods.formatNumber(elem.last),
        dif: this.$methods.formatPercent(elem.dif),
        className: elem.dif > 0 ? 'text-green-500' : elem.dif < 0 ? 'text-red-500' : ''
      };
    },
    formatNews(elem: News) {
      return {
        id: elem.id,
        author: elem.author,
        title: elem.title,
        intro: elem.intro,
        tag: elem.tag,
        img: elem.img,
        className: this.getNewsClasses(elem.tag),
        date: this.$methods.formatDate(elem.date)
      };
    },
    getNewsClasses(tag: NewsTag) {
      switch (tag) {
        case 'latest':
          return 'text-pink-800 bg-pink-100';
        case 'markets':
          return 'text-red-800 bg-red-100';
        case 'opinion':
          return 'text-green-800 bg-green-100';
      }
    },
    getAvatar(img: string) {
      return require('@/assets/img/' + img);
    }
  },
  computed: {
    firstLoad() {
      return false;
    }
  },
  created() {
    console.warn('CREATED');
    userService
      .getInfo()
      .then((response) => {
        this.initUserInfo(response.data);
      })
      .catch((e) => {
        console.warn(e);
      })
      .finally(() => {
        this.loadingUserInfo = false;
      });

    homeService
      .getMarkets()
      .then((response) => {
        this.markets = response.data.list.map(this.formatMarket);
        this.marketsUpsDowns = response.data.updowns;
        this.marketId = this.marketsUpsDowns[0].id;
        this.marketName = this.marketsUpsDowns[0].name;
        this.upDowns = this.marketsUpsDowns.find((elem) => elem.id === this.marketId);

        if (this.upDowns == null) {
          console.log('EMPTY'); // TODO: Add error
        } else {
          this.drawUpsDowns = [
            ...this.upDowns.ups.map(this.formatMarket),
            ...this.upDowns.downs.map(this.formatMarket)
          ];
        }
      })
      .catch((e) => {
        console.warn(e);
      })
      .finally(() => {
        this.loadingMarketInfo = false;
      });

    homeService
      .getNews()
      .then((response) => {
        console.log(response.data);
        this.lastNews = response.data.news.map(this.formatNews);
      })
      .catch((e) => {
        console.warn(e);
      })
      .finally(() => {
        this.loadingNews = false;
      });

    // Promise.all([userService.getInfo(), homeService.getMarkets()])
    //   .then((result) => console.warn(result))
    //   .catch((result) => console.warn(result));
  },
  mounted() {
    console.warn('MOUNTED');
    console.warn(this.$methods);
  }
});
</script>
