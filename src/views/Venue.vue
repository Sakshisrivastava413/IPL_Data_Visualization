<template>
  <BarChart
    titleText="Top 10 Venues"
    chartType="bar"
    :chartData="TopVenuesChart.data"
    :chartOptions="TopVenuesChart.options" />
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
      topVenueData.push({
        vName: venue.name,
        matchesPlayed: venue.matchesPlayed
      })
    });
    this.TopVenuesChart.data = {
      labels: topVenueData.map(t => t.vName),
      datasets: [{
        label: 'Total Runs',
         data: topVenueData.map(t => t.matchesPlayed),
         backgroundColor: '#7E94F6'
      }
      ]
    };
    this.TopVenuesChart.options = {
      scales: {
        xAxes: [{
          
        }],
        yAxes: [{
          ticks: {
          beginAtZero: true,
          maxRotation: 0,
          minRotation: 0
          }
        }],
      }
    }
  }
}
</script>

<style>

</style>
