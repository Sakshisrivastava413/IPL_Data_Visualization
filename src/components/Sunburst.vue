<template>
<div>
  <div class="chart">
    <ChartTitle :title="titleText" />
    <chart-sunburst ref="chart" :data="chartData" :config="chartConfig"></chart-sunburst>
  </div>
</div>
</template>

<script>
import { ChartSunburst } from "vue-d2b";
import ChartTitle from "./ChartTitle.vue";

export default {
  name: "Sunburst",
  props: [ 'titleText' ],
  components: {
    ChartSunburst,
    ChartTitle
  },
  data() {
    return {
      chartData: {
        label: "Team Details",
        children: []
      },
    }
  }
}
</script>

<style scoped>
</style>
