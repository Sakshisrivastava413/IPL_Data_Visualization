<template>
  <div class="main-container" :style="style">
    <div class="title-container" v-if="titleText">
      <ChartTitle :title="titleText" :subTitle="subTitleText" />
    </div>
    <slot></slot>
    <div class="bar-chart-container">
      <canvas ref="chart"></canvas>
    </div>
  </div>
</template>

<script>
  import Chart from 'chart.js';
  import ChartTitle from './ChartTitle.vue';

  export default {
    name: 'Chart',
    props: [
      'titleText', 'subTitleText', 'chartType', 'chartData', 'chartOptions', 'parentStyle'
    ],
    components: {
      ChartTitle
    },
    data() {
      return {
        chart: null,
        style: this.parentStyle
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
      },
      parentStyle: function(newStyle) {
        this.style = {
          ...this.style,
          ...newStyle
        };
      }
    }
  }
</script>

<style scoped>
  .title-container {
    margin-bottom: 40px;
  }
  .main-container {
    margin-top: 30px;
  }
  .bar-chart-container {
    margin-left: 20px;
  }
</style>