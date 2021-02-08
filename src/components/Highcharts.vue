<script lang="ts">
import { defineComponent, h, ref, onMounted, onUnmounted, watch, toRefs } from 'vue';
// import Highcharts from 'highcharts';
// import Highcharts, { chart as MyThing } from 'highcharts';
import { chart as MakeChart } from 'highcharts';

const vueHighcharts = defineComponent({
  name: 'VueHighchart',
  props: {
    type: {
      type: String as () => 'chart',
      default: 'chart'
    },
    options: {
      type: Object,
      required: true
    },

    redrawOnUpdate: {
      type: Boolean,
      default: true
    },

    oneToOneUpdate: {
      type: Boolean,
      default: false
    },

    animateOnUpdate: {
      type: Boolean,
      default: true
    }
  },

  setup(props, context) {
    const emit = context.emit;
    const chartRef = ref<string>('chartReference');
    const chart = ref<null | Highcharts.Chart>(null);

    const { options } = toRefs(props);
    // if (options.value && Highcharts[props.type]) {
    if (options.value /* && Highcharts[props.type] */) {
      watch(
        options,
        (newValue) => {
          if (chart.value == null) return;
          chart.value.update(newValue, props.redrawOnUpdate, props.oneToOneUpdate, props.animateOnUpdate);
          emit('updated');
        },
        { deep: true }
      );

      onMounted(() => {
        // chart.value = Highcharts[props.type](chartRef.value, options.value, () => {
        chart.value = MakeChart(chartRef.value, options.value, () => {
          emit('rendered');
        });
      });

      onUnmounted(() => {
        if (chart.value) chart.value.destroy();
        emit('destroyed');
      });
    } else if (!props.options) {
      console.warn('The "options" parameter is required.');
    } else {
      console.warn(`${props.type} is not a valid highcharts type or has not been imported`);
    }

    // Rather than returning a render function here. We'll return the chart ref and highcharts
    // instance so there exposed.
    return {
      chartRef,
      chart
    };
  },

  render() {
    // console.warn(this.chartRef);
    return h('div', {
      class: 'vue-highcharts',
      ref: 'chartRef'
    });
  }
});

export default vueHighcharts;
</script>
