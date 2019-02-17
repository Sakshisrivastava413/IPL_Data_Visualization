<template>
  
</template>

<script>
import BarChart from '../components/BarChart.vue';
import venue_json from '../../json/top10Venue.json';
export default {
  name: 'Venue',
  components: {
    BarChart,
  },
  data() {
    return {
      TopVenuesChart: {
        options: {},
        data: {
          labels: [],
          datasets: []
        }
      }
    }
  },
  mounted() {
    const topVenueData = [];

    Object.values(venue_json).forEach(venue => {
      console.log(venue)
    })
  }
}
</script>

<style>

</style>
