<template>
  <div class="main-container">
    <ChartTitle :title="titleText" />
    <div>
      <canvas ref="chart"></canvas>
    </div>
  </div>
</template>

<script>
  import Chart from 'chart.js';
  import ChartTitle from './ChartTitle.vue';

  export default {
    name: 'BarChart',
    props: [
      'titleText', 'chartType', 'chartData', 'chartOptions'
    ],
    components: {
      ChartTitle
    },
    data() {
      return {
        chart: null
      };
    },
    mounted() {
      this.chart = new Chart(this.$refs.chart.getContext("2d"), {
        type: this.chartType,
        data: this.chartData,
        options: this.chartOptions
      });
    },
    watch: {
      chartData: function() {
        this.chart.data = this.chartData;
        this.chart.options = this.chartOptions;
        this.chart.update();
      }
    }
  }
</script>

<style scoped>

  .main-container {
    padding-top: 30px
  }

  .graph-header {
    margin-top: 30px;
    margin-left: 30px;
    font-size: 30px;
  }
</style>