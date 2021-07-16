<template>
  <MainHeader>
    <Breadcrumb :elems="breadcrumb" />
  </MainHeader>
  <div class="container mx-auto py-6 px-4 sm:px-6 lg:px-8">
    <div
      class="bg-white rounded-xl overflow-hidden shadow py-6 px-4 sm:px-6 lg:px-8 lg:grid lg:grid-cols-3 lg:gap-6 mb-8"
    >
      <div class="lg:col-span-1">
        <h1 class="text-lg font-medium leading-6 text-gray-900">Search</h1>
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
        <template v-if="wealthSituation.length">
          <h2 class="text-xl font-semibold text-gray-800 mb-3">Wealth situation</h2>
          <CustomTable class="mb-6">
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
        <h2 class="text-xl font-semibold text-gray-800 mb-3">Wealth evolution</h2>
        <div class="bg-white rounded-lg shadow divide-y divide-gray-200 mb-6 overflow-hidden">
          <div
            v-for="elem in wealthEvolution"
            :key="elem.description"
            class="flex justify-between items-center px-5 py-4 text-gray-700"
            :class="[elem.parent ? 'font-semibold' : '', elem.css ? elem.css : '']"
          >
            <div :class="[elem.child ? 'ml-3' : '', elem.cssDescription ? elem.cssDescription : '']">
              {{ elem.description }}
            </div>
            <div :class="elem.cssValue != null ? elem.cssValue : ''">{{ elem.value }}</div>
          </div>
        </div>

        <h2 class="text-xl font-semibold text-gray-800 mb-3">Benchmarks evolution</h2>
        <CustomTable class="mb-6">
          <table>
            <thead>
              <tr>
                <th class="text-left">Name</th>
                <th class="text-right">End</th>
                <th class="text-right">Month</th>
                <th class="text-right">Year</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in benchmark" :key="item.name">
                <td class="text-left">{{ item.name }}</td>
                <td class="text-right">{{ item.end }}</td>
                <td class="text-right">{{ item.month }}</td>
                <td class="text-right">{{ item.year }}</td>
              </tr>
            </tbody>
          </table>
        </CustomTable>

        <template v-if="exchange.length">
          <h2 class="text-xl font-semibold text-gray-800 mb-3">Exchange</h2>
          <CustomTable class="mb-6" :customTdFontSize="true">
            <table>
              <thead>
                <tr>
                  <th class="text-left">Name</th>
                  <th class="text-right">Titles</th>
                  <th class="text-right">End</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in exchange" :key="item.name">
                  <td class="text-left text-sm">{{ item.name }}</td>
                  <td class="text-right text-sm">{{ item.titles }}</td>
                  <td class="text-right text-sm">{{ item.end }}</td>
                </tr>
                <tr class="bg-gray-50 font-semibold">
                  <td class="text-left text-base uppercase">Total</td>
                  <td class="text-right text-base">{{ titlesExchange }}</td>
                  <td class="text-right text-base">{{ totalExchange }}</td>
                </tr>
              </tbody>
            </table>
          </CustomTable>
        </template>

        <template v-if="funds.length">
          <h2 class="text-xl font-semibold text-gray-800 mb-3">Funds</h2>
          <CustomTable class="mb-6" :customTdFontSize="true">
            <table>
              <thead>
                <tr>
                  <th class="text-left">Name</th>
                  <th class="text-right">Shares</th>
                  <th class="text-right">End</th>
                  <th class="text-right">Gains and losses</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in funds" :key="item.name">
                  <td class="text-left text-sm">{{ item.name }}</td>
                  <td class="text-right text-sm">{{ item.shares }}</td>
                  <td class="text-right text-sm">{{ item.end }}</td>
                  <td class="text-right text-sm">{{ item.gainLosses }}</td>
                </tr>
                <tr class="bg-gray-50 font-semibold">
                  <td class="text-left text-base uppercase">Total</td>
                  <td class="text-right text-base">{{ sharesFunds }}</td>
                  <td class="text-right text-base">{{ totalFunds }}</td>
                  <td class="text-right text-base"></td>
                </tr>
              </tbody>
            </table>
          </CustomTable>
        </template>

        <template v-if="plans.length">
          <h2 class="text-xl font-semibold text-gray-800 mb-3">Plans</h2>
          <CustomTable class="mb-6" :customTdFontSize="true">
            <table>
              <thead>
                <tr>
                  <th class="text-left">Name</th>
                  <th class="text-right">Shares</th>
                  <th class="text-right">End</th>
                  <th class="text-right">Gains and losses</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in plans" :key="item.name">
                  <td class="text-left text-sm">{{ item.name }}</td>
                  <td class="text-right text-sm">{{ item.shares }}</td>
                  <td class="text-right text-sm">{{ item.end }}</td>
                  <td class="text-right text-sm">{{ item.gainLosses }}</td>
                </tr>
                <tr class="bg-gray-50 font-semibold">
                  <td class="text-left text-base uppercase">Total</td>
                  <td class="text-right text-base">{{ sharesPlans }}</td>
                  <td class="text-right text-base">{{ totalPlans }}</td>
                  <td class="text-right text-base"></td>
                </tr>
              </tbody>
            </table>
          </CustomTable>
        </template>
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
import statementsService, {
  ElemWealthSituation,
  WealthEvolution,
  ItemBenchmarkEvolution,
  ItemPortfolioExchange,
  ItemFundsPlans
} from './services/statements';

interface ViewElemSituation {
  description: string;
  initial: number;
  final: number;
  percentage: number;
  currency: string;
}

interface ViewElemBenchmark {
  name: string;
  end: string;
  month: string;
  year: string;
}

interface ViewExchange {
  name: string;
  titles: string;
  end: string;
}

interface ViewFundsPlan {
  name: string;
  shares: string;
  end: string;
  gainLosses: string;
}

interface DescriptionValue {
  description: string;
  value: string;
  parent?: boolean;
  child?: boolean;
  css?: string;
  cssDescription?: string;
  cssValue?: string;
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
      wealthSituation: [] as ViewElemSituation[],
      wealthEvolution: [] as DescriptionValue[],
      benchmark: [] as ViewElemBenchmark[],
      exchange: [] as ViewExchange[],
      totalExchange: '',
      titlesExchange: '',
      funds: [] as ViewFundsPlan[],
      totalFunds: '',
      sharesFunds: '',
      plans: [] as ViewFundsPlan[],
      totalPlans: '',
      sharesPlans: ''
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
    },
    showWealthEvolution(evolution: WealthEvolution) {
      this.wealthEvolution = [
        {
          description: 'Wealth at the beginning of the period',
          value: this.$methods.formatCurrency(evolution.balanceInitial, evolution.currency)
        },
        {
          description: 'Total contributions',
          value: this.$methods.formatCurrency(evolution.contributions, evolution.currency),
          parent: true
        },
        {
          description: 'Contributions in cash',
          value: this.$methods.formatCurrency(evolution.contributionsCash, evolution.currency),
          child: true
        },
        {
          description: 'Entry transfers',
          value: this.$methods.formatCurrency(evolution.contributionsEntryTransfer, evolution.currency),
          child: true
        },
        {
          description: 'Total withdrawal',
          value: this.$methods.formatCurrency(evolution.withdrawal, evolution.currency),
          parent: true
        },
        {
          description: 'Withdrawal in cash',
          value: this.$methods.formatCurrency(evolution.withdrawalCash, evolution.currency),
          child: true
        },
        {
          description: 'Output transfers',
          value: this.$methods.formatCurrency(evolution.withdrawalOutputTransfer, evolution.currency),
          child: true
        },
        {
          description: 'Holding funds',
          value: this.$methods.formatCurrency(evolution.distributionsWithHoldingFunds, evolution.currency),
          child: true
        },
        {
          description: 'Wealth at the end of the period',
          value: this.$methods.formatCurrency(evolution.balanceEnd, evolution.currency)
        },
        {
          description: 'Total profit',
          value: this.$methods.formatCurrency(evolution.profit, evolution.currency),
          parent: true,
          css: 'bg-gray-50',
          cssDescription: 'uppercase',
          cssValue: `${evolution.profit < 0 ? ' text-red-500' : ''}`
        }
      ];
    },
    benchmarksEvolution(benchmark: ItemBenchmarkEvolution[]) {
      this.benchmark = benchmark.map((elem) => {
        return {
          name: elem.name,
          end: this.$methods.formatImport(elem.endValue),
          month: this.$methods.formatPercent(elem.month),
          year: this.$methods.formatPercent(elem.year)
        };
      });
    },
    exchangeMovements(exchange: ItemPortfolioExchange[]) {
      let total = 0;
      let titles = 0;
      exchange.forEach((item) => {
        total += item.endValue;
        titles += item.titles;
        this.exchange.push({
          name: item.name,
          titles: this.$methods.formatNumber(item.titles),
          end: this.$methods.formatCurrency(item.endValue, item.currency)
        });
      });
      this.totalExchange = this.$methods.formatCurrency(total, exchange[0].currency);
      this.titlesExchange = this.$methods.formatNumber(titles);
    },
    fundsPlansMovements(funds: ItemFundsPlans[], isFunds: boolean) {
      const arrayProduct = isFunds ? this.funds : this.plans;

      let total = 0;
      let shares = 0;
      funds.forEach((item) => {
        total += item.endValue;
        shares += item.shares;
        arrayProduct.push({
          name: item.name,
          shares: this.$methods.formatNumber(item.shares),
          end: this.$methods.formatCurrency(item.endValue, item.currency),
          gainLosses: this.$methods.formatPercent(item.gainLosses)
        });
      });

      const resultTotal = this.$methods.formatCurrency(total, funds[0].currency);
      const resultShares = this.$methods.formatNumber(shares);

      if (isFunds) {
        this.totalFunds = resultTotal;
        this.sharesFunds = resultShares;
      } else {
        this.totalPlans = resultTotal;
        this.sharesPlans = resultShares;
      }
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
          const data = response.data;
          this.calculateWealthSituation(data.wealthSituation);
          this.showWealthEvolution(data.wealthEvolution);
          this.benchmarksEvolution(data.benchmarkEvolution);
          if (data.portfolioExchange != null) {
            this.exchangeMovements(data.portfolioExchange);
          }
          if (data.portfolioFunds != null) {
            this.fundsPlansMovements(data.portfolioFunds, true);
          }
          if (data.portfolioPlans != null) {
            this.fundsPlansMovements(data.portfolioPlans, false);
          }
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
