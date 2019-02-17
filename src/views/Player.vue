<template>
  
</template>

<script>
import BarChart from '../components/BarChart.vue';
import batsman_json from '../../json/top10Batsmen.json';
export default {
  name: 'Player',
  components: {
    BarChart,
  },
  data() {
    return {
      TopBatsmanData: {
        options: {},
        data: {
          labels: [],
          datasets: []
        }
      }
    }
  }
}
</script>

<style>

</style>
