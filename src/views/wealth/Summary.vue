<template>
  <MainHeader>
    <SectionMenu :elems="menu" class="mb-8" />
    <div class="flex flex-col md:flex-row justify-between items-center">
      <div class="mb-6 md:mb-0">
        <h1 class="text-3xl font-bold text-gray-900 text-center md:text-left">
          Total wealth: <span class="text-gray-400 font-semibold">{{ total }}</span>
        </h1>
      </div>
      <div class="w-full sm:w-auto">
        <AccountSelector @selected="updateWealth()" />
      </div>
    </div>
  </MainHeader>
  <div class="container mx-auto py-6 px-4 sm:px-6 lg:px-8">
    <div v-if="loading" class="grid place-content-center">
      <Loading />
    </div>
    <section class="mt-4" v-else>
      <div class="grid gap-x-8 gap-y-12 grid-cols-1 lg:grid-cols-2 mb-8">
        <section>
          <h2 class="text-xl font-semibold text-gray-800 mb-3">Summary</h2>
          <div class="bg-white rounded-xl shadow divide-y divide-gray-200 overflow-hidden">
            <div
              class="grid grid-cols-4 px-5 py-4 text-gray-700 items-center hover:bg-gray-50 cursor-pointer"
              v-for="item in productsDistribution"
              :key="item.name"
            >
              <div class="col-span-2">
                <a href="#" class="font-semibold text-blue-600">{{ item.name }}</a>
              </div>
              <div class="text-right">{{ item.value }}</div>
              <div class="text-right">
                {{ item.percentage
                }}<svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="fill-current text-gray-400 h-4 inline-block ml-8"
                  viewBox="0 0 256 512"
                >
                  <path
                    d="M24.707 38.101L4.908 57.899c-4.686 4.686-4.686 12.284 0 16.971L185.607 256 4.908 437.13c-4.686 4.686-4.686 12.284 0 16.971L24.707 473.9c4.686 4.686 12.284 4.686 16.971 0l209.414-209.414c4.686-4.686 4.686-12.284 0-16.971L41.678 38.101c-4.687-4.687-12.285-4.687-16.971 0z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </section>
        <section>
          <h2 class="text-xl font-semibold text-gray-800 mb-3">Operating limit</h2>
          <div class="bg-white rounded-xl shadow divide-y divide-gray-200">
            <div
              class="grid grid-cols-3 px-5 py-4 text-gray-700 items-center"
              v-for="(value, name) in operatingLimit"
              :key="name"
            >
              <div class="col-span-2">
                <span class="font-semibold text-gray-700">{{ value.name }}</span>
              </div>
              <div class="text-right">
                {{ value.value }}
              </div>
            </div>
          </div>
        </section>
      </div>
      <section class="mb-8">
        <h2 class="text-xl font-semibold text-gray-800 mb-3">Overview</h2>
        <div class="bg-white rounded-xl md:px-4 py-6 lg:py-8 shadow overflow-hidden">
          <VueHighchart type="chart" :options="chartOptions" />
        </div>
      </section>
      <section>
        <h2 class="text-xl font-semibold text-gray-800 mb-3">Graphs</h2>
        <div class="grid gap-8 grid-cols-1 lg:grid-cols-3 mb-8">
          <div class="bg-white rounded-xl py-4 shadow">
            <VueHighchart type="chart" :options="activeOptions" />
          </div>
          <div class="bg-white rounded-xl py-4 shadow">
            <VueHighchart type="chart" :options="productOptions" />
          </div>
          <div class="bg-white rounded-xl py-4 shadow">
            <VueHighchart type="chart" :options="geoOptions" />
          </div>
        </div>
      </section>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import store from '@/utils/store';
import wealthService, { Summary, Graph, OperatingLimit, Evolution } from './services/wealth';
import { Options as HighchartsOptions, SeriesPieOptions } from 'highcharts';

import MainHeader from '@/components/MainHeader.vue';
import SectionMenu, { SectionMenuItem } from '@/components/SectionMenu.vue';
import Loading from '@/components/Loading.vue';
import AccountSelector from '@/components/AccountSelector.vue';
import VueHighchart from '@/components/Highcharts.vue';

import { ProductDistribution, OperatingLimitSummary, CustomPointOptionsObject } from './summary.models';

export default defineComponent({
  name: 'Home',
  components: {
    MainHeader,
    SectionMenu,
    AccountSelector,
    Loading,
    VueHighchart
  },
  data() {
    const menu: SectionMenuItem[] = [
      {
        link: '/wealth/summary',
        text: 'Summary'
      },
      {
        link: '/',
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

    return {
      menu: menu,
      loading: true,
      total: '',
      productsDistribution: [] as ProductDistribution[],
      operatingLimit: {} as OperatingLimitSummary,
      chartOptions: {} as HighchartsOptions,
      activeOptions: {} as HighchartsOptions,
      productOptions: {} as HighchartsOptions,
      geoOptions: {} as HighchartsOptions
    };
  },
  computed: {
    account() {
      return store.state.accountSelected;
    }
  },
  methods: {
    setWealthInfo(data: Summary) {
      this.total = this.$methods.formatCurrency(data.total, data.currency);
      this.productsDistribution = data.compositions.map(
        (elem): ProductDistribution => {
          return {
            name: elem.name,
            value: this.$methods.formatCurrency(elem.value, elem.currency),
            percentage: this.$methods.formatPercent(elem.percentage)
          };
        }
      );
      this.drawOperatingLimit(data.operatingLimit);
      this.drawSummaryGraph(data.evolution);
      this.drawGraphs(data.graphs);
    },
    updateWealth() {
      this.loadWealth();
    },
    drawOperatingLimit(limits: OperatingLimit) {
      this.operatingLimit.exchange = {
        name: 'Exchange',
        value: this.$methods.formatCurrency(limits.exchange.limit, limits.exchange.currency)
      };
      this.operatingLimit.cfds = {
        name: "Cfd's",
        value: this.$methods.formatCurrency(limits.cfds.limit, limits.cfds.currency)
      };
      this.operatingLimit.derivatives = {
        name: 'Derivatives',
        value: this.$methods.formatCurrency(limits.derivatives.limit, limits.derivatives.currency)
      };
      this.operatingLimit.forex = {
        name: 'Forex',
        value: this.$methods.formatCurrency(limits.forex.limit, limits.forex.currency)
      };
      this.operatingLimit.funds = {
        name: 'Investment funds',
        value: this.$methods.formatCurrency(limits.funds.limit, limits.funds.currency)
      };
      this.operatingLimit.plans = {
        name: 'Pension plans',
        value: this.$methods.formatCurrency(limits.plans.limit, limits.plans.currency)
      };
      this.operatingLimit.transfers = {
        name: 'Transfers',
        value: this.$methods.formatCurrency(limits.transfers.limit, limits.transfers.currency)
      };
    },
    drawGraphs(data: Graph) {
      const seriesActive: SeriesPieOptions[] = [
        {
          type: 'pie',
          name: this.account.alias,
          data: data.active.map((elem) => {
            return {
              y: elem.percentage,
              name: elem.description
            };
          }),
          innerSize: '60%'
        }
      ];
      this.activeOptions = this.getPieOptions('Active', seriesActive);

      const seriesProduct: SeriesPieOptions[] = [
        {
          type: 'pie',
          name: this.account.alias,
          data: data.product.map((elem) => {
            return {
              y: elem.percentage,
              name: elem.description
            };
          }),
          innerSize: '60%'
        }
      ];
      this.productOptions = this.getPieOptions('Product', seriesProduct);

      const seriesGeo: SeriesPieOptions[] = [
        {
          type: 'pie',
          name: this.account.alias,
          data: data.geographic.map((elem) => {
            return {
              y: elem.percentage,
              name: elem.description
            };
          }),
          innerSize: '60%'
        }
      ];
      this.geoOptions = this.getPieOptions('Geographic', seriesGeo);
    },
    drawSummaryGraph(evolution: Evolution[]) {
      // eslint-disable-next-line @typescript-eslint/no-this-alias
      const that = this;

      this.chartOptions = {
        chart: {
          type: 'line',
          height: 500,
          spacingBottom: 0
        },
        title: {
          text: undefined
        },
        subtitle: {
          text: undefined
        },
        xAxis: {
          type: 'datetime'
        },
        yAxis: {
          title: {
            text: 'Valor'
          }
        },
        tooltip: {
          useHTML: true,
          valueDecimals: 2,
          formatter: function() {
            const pKey = that.$methods.formatDate(this.x);
            const color = this.color;
            const name = this.series.name;
            const yPoint = that.$methods.formatPercent(this.y);
            const pointOptions = this.point.options as CustomPointOptionsObject;
            const patrimonio = that.$methods.formatCurrency(pointOptions.patrimonio, pointOptions.currency);
            return `
              <small>${pKey}</small>
              <div><span style="color:${color}">${name}</span>: <b>${yPoint}</b></div>
              <div>Patrimonio: ${patrimonio}</div>
            `;
          }
        },
        series: [
          {
            type: 'line',
            name: this.account.alias,
            tooltip: {
              valueDecimals: 2
            },
            lineWidth: 2,
            data: []
          }
        ],
        responsive: {
          rules: [
            {
              condition: {
                maxWidth: 500
              },
              chartOptions: {
                chart: {
                  height: 400
                }
              }
            }
          ]
        }
      };
      // https://github.com/highcharts/highcharts/issues/13373
      if (this.chartOptions.series != null && this.chartOptions.series[0].type === 'line') {
        this.chartOptions.series[0].data = evolution.map((elem) => {
          return {
            x: new Date(elem.dateValue).getTime(),
            y: elem.value,
            options: {
              patrimonio: elem.total,
              currency: elem.currency
            }
          };
        });
      }
    },
    getPieOptions(title: string, series: SeriesPieOptions[]): HighchartsOptions {
      return {
        chart: {
          type: 'pie'
        },
        title: {
          text: title
        },
        tooltip: {
          hideDelay: 0,
          pointFormat: '{series.name}: <b>{point.y:.1f}%</b>'
        },
        accessibility: {
          point: {
            valueSuffix: '%'
          }
        },
        plotOptions: {
          pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
              enabled: true,
              format: '<b>{point.name}</b>: {point.percentage:.1f} %'
            },
            showInLegend: false
          }
        },
        series: series
      };
    },
    loadWealth() {
      this.loading = true;
      wealthService
        .getSummary(this.account.id)
        .then((response) => {
          this.setWealthInfo(response.data);
        })
        .catch((e) => {
          console.warn(e);
        })
        .finally(() => {
          this.loading = false;
        });
    }
  },
  created() {
    this.loadWealth();
  }
});
</script>
