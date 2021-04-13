<template>
  <MainHeader>
    <Breadcrumb :elems="breadcrumb" />
  </MainHeader>
  <div class="container mx-auto py-6 px-4 sm:px-6 lg:px-8">
    <div
      class="bg-white rounded-xl overflow-hidden shadow py-6 px-4 sm:px-6 lg:px-8 lg:grid lg:grid-cols-3 lg:gap-6 mb-8"
    >
      <div class="lg:col-span-1">
        <h3 class="text-lg font-medium leading-6 text-gray-900">Search</h3>
        <p class="mt-1 text-sm text-gray-600">Wealth summary and movements in the selected period.</p>
      </div>
      <div class="mt-5 lg:mt-0 lg:col-span-2">
        <div class="grid grid-cols-2 gap-x-6 gap-y-8 mb-8">
          <div class="col-span-2 sm:col-span-1">
            <label for="startDate" class="block text-sm font-medium text-gray-700">Start date</label>
            <input
              type="date"
              name="startDate"
              id="startDate"
              v-model="startDate"
              aria-required="true"
              :aria-invalid="hasErrorStartDate"
              aria-describedby="startDateDescription"
              @change="checkStartDate"
              class="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
            />
            <span id="startDateDescription" v-if="hasErrorStartDate" class="text-sm text-red-600">{{
              errorStartDate
            }}</span>
          </div>
          <div class="col-span-2 sm:col-span-1">
            <label for="endDate" class="block text-sm font-medium text-gray-700">End date</label>
            <input
              type="date"
              name="endDate"
              id="endDate"
              v-model="endDate"
              aria-required="true"
              :aria-invalid="hasErrorEndDate"
              aria-describedby="endDateDescription"
              @change="checkEndDate"
              class="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
            />
            <span id="endDateDescription" v-if="hasErrorEndDate" class="text-sm text-red-600">{{ errorEndDate }}</span>
          </div>
          <div class="col-span-2 flex flex-wrap justify-center items-center max-w-md sm:max-w-none mx-auto">
            <button
              class="px-3 py-2 w-full sm:w-auto rounded-tl rounded-tr sm:rounded-bl sm:rounded-tr-none text-gray-700 sm:text-sm font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none border border-gray-300"
              @click="last7Days"
            >
              Last 7 days
            </button>
            <button
              class="px-3 py-2 w-full sm:w-auto text-gray-700 sm:text-sm font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none border border-gray-300 -mt-px sm:mt-0 sm:-ml-px"
              @click="last30Days"
            >
              Last 30 days
            </button>
            <button
              class="px-3 py-2 w-full sm:w-auto rounded-bl rounded-br sm:rounded-bl-none sm:rounded-tr text-gray-700 sm:text-sm font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none border border-gray-300 -mt-px sm:mt-0 sm:-ml-px"
              @click="last6Months"
            >
              Last 6 months
            </button>
          </div>
        </div>
        <div class="text-right border-t border-gray-200 pt-6">
          <button
            type="submit"
            @click="submit"
            class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Search
          </button>
        </div>
      </div>
    </div>
    <template class="col-span-3" v-if="loading || loadedMovements">
      <Loading v-if="loading" class="mx-auto" />
      <template v-else>
        <div class="-mx-4 sm:-mx-8 px-4 sm:px-8 overflow-x-auto" v-if="wealthSituation.length">
          <div class="inline-block min-w-full shadow sm:rounded-lg border-b border-gray-200 overflow-hidden">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th class="px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider text-left">
                    Product
                  </th>
                  <th class="px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">
                    Initial
                  </th>
                  <th class="px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">End</th>
                  <th class="px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">%</th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr v-for="elem in wealthSituation" :key="elem.description">
                  <td class="px-5 py-5 text-sm text-left">{{ elem.description }}</td>
                  <td class="px-5 py-5 text-sm text-right">
                    {{ $methods.formatCurrency(elem.initial, elem.currency) }}
                  </td>
                  <td class="px-5 py-5 text-sm text-right">{{ $methods.formatCurrency(elem.final, elem.currency) }}</td>
                  <td class="px-5 py-5 text-sm text-right">
                    {{ $methods.formatPercent(elem.percentage) }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <CustomTable>
          <table>
            <thead>
              <tr>
                <th class="text-left">Product</th>
                <th class="text-right">Initial</th>
                <th class="text-right">End</th>
                <th class="text-right">%</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="elem in wealthSituation" :key="elem.description">
                <td class="text-left">{{ elem.description }}</td>
                <td class="text-right">
                  {{ $methods.formatCurrency(elem.initial, elem.currency) }}
                </td>
                <td class="text-right">{{ $methods.formatCurrency(elem.final, elem.currency) }}</td>
                <td class="text-right">
                  {{ $methods.formatPercent(elem.percentage) }}
                </td>
              </tr>
            </tbody>
          </table>
        </CustomTable>
      </template>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import MainHeader from '@/components/MainHeader.vue';
import Breadcrumb, { BreadcrumbItem } from '@/components/Breadcrumb.vue';
import CustomTable from '@/components/CustomTable.vue';
import Loading from '@/components/Loading.vue';
import statementsService, { ElemWealthSituation } from './services/statements';

interface ViewElemSituation {
  description: string;
  initial: number;
  final: number;
  percentage: number;
  currency: string;
}

export default defineComponent({
  name: 'Statements',
  components: {
    MainHeader,
    Breadcrumb,
    Loading,
    CustomTable
  },
  data() {
    const breadcrumb: BreadcrumbItem[] = [
      { link: '/wealth/statements', text: 'Statements' },
      { link: '/wealth/movements', text: 'Movements' }
    ];
    return {
      breadcrumb: breadcrumb,
      startDate: '',
      endDate: '',
      loading: false,
      loadedMovements: false,
      hasErrorStartDate: false,
      errorStartDate: null as string | null,
      hasErrorEndDate: false,
      errorEndDate: null as string | null,
      wealthSituation: [] as ViewElemSituation[]
    };
  },
  methods: {
    setStartDate(date: Date) {
      this.startDate = this.formatDateYYYYMMDD(date);
    },
    setEndDate(date: Date = new Date()) {
      this.endDate = this.formatDateYYYYMMDD(date);
    },
    formatDateYYYYMMDD(date: Date) {
      return `${date.getFullYear()}-${('0' + (date.getMonth() + 1)).slice(-2)}-${('0' + date.getDate()).slice(-2)}`;
    },
    last7Days() {
      const d = new Date();
      d.setDate(d.getDate() - 7);
      this.setStartDate(d);
      this.setEndDate();
    },
    last30Days() {
      const d = new Date();
      d.setDate(d.getDate() - 30);
      this.setStartDate(d);
      this.setEndDate();
    },
    last6Months() {
      const d = new Date();
      d.setDate(d.getDate() - 180);
      this.setStartDate(d);
      this.setEndDate();
    },
    checkStartDate() {
      if (this.startDate == null || this.startDate === '') {
        this.hasErrorStartDate = true;
        this.errorStartDate = 'Start date is required';
      } else {
        this.hasErrorStartDate = false;
        this.errorStartDate = null;
      }
    },
    checkEndDate() {
      if (this.endDate == null || this.endDate === '') {
        this.hasErrorEndDate = true;
        this.errorEndDate = 'End date is required';
      } else {
        this.hasErrorEndDate = false;
        this.errorEndDate = null;
      }
    },
    calculateWealthSituation(situation: ElemWealthSituation[]) {
      // this.wealthSituation = response.data.wealthSituation;
      const totalEndPeriod = situation.reduce((accumulator, currentValue) => accumulator + currentValue.end, 0);
      this.wealthSituation = situation.map((elem) => {
        return {
          description: elem.des,
          initial: elem.ini,
          final: elem.end,
          percentage: (100 * elem.end) / totalEndPeriod,
          currency: elem.currency
        };
      });
      console.log(totalEndPeriod);
      console.log(this.wealthSituation);
    },
    submit() {
      this.checkStartDate();
      this.checkEndDate();
      if (this.errorStartDate || this.errorEndDate) {
        return;
      }
      if (this.startDate > this.endDate) {
        this.hasErrorStartDate = true;
        this.errorStartDate = 'Start date can´t be greater than End date';
        return;
      }
      this.loading = true;
      statementsService
        .getMovements()
        .then((response) => {
          this.calculateWealthSituation(response.data.wealthSituation);
        })
        .catch((e) => {
          console.warn(e);
        })
        .finally(() => {
          this.loadedMovements = true;
          this.loading = false;
        });
    }
  }
});
</script>
