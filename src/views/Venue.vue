<template>
<div class="main">
    <div class="barChart">
      <BarChart
        titleText="Top 10 Venues"
        chartType="horizontalBar"
        :chartData="TopVenuesChart.data"
        :chartOptions="TopVenuesChart.options" />
    </div>
    <div class="chartObservation">
      <Observation />
    </div>
  </div>
 
</template>

<script>
import BarChart from '../components/BarChart.vue';
import Observation from '../components/Observation.vue';
import venue_json from '../../json/top10Venue.json';
export default {
  name: 'Venue',
  components: {
    BarChart,
    Observation
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
    const backgroundColor = [
      '#F5B7B1',
      '#D2B4DE',
      '#F9E79F',
      '#D5DBDB',
      '#AED6F1',
      '#EDBB99',
      '#A3E4D7',
      '#E2F5CC',
      '#EECCF5',
      '#FEA5A5',
    ];

    Object.values(venue_json).forEach(venue => {
      topVenueData.push({
        vName: venue.name,
        matchesPlayed: venue.matchesPlayed,
        totalRuns: venue.totalRuns
      })
    });
    this.TopVenuesChart.data = {
      labels: topVenueData.map(t => t.vName),
      datasets: [{
        label: 'Matches played',
         data: topVenueData.map(t => t.matchesPlayed),
         backgroundColor: backgroundColor
      }
      ]
    };
    this.TopVenuesChart.options = {
      responsive: true,
      scales: {
        xAxes: [{
          ticks: {
          beginAtZero: true
          }
        }],
        yAxes: [{
        }],
      },
      tooltips: {
        callbacks: {
          label: function(tooltipItem) {
            return `No. of matches played: ${tooltipItem.xLabel}
              Total runs: ${topVenueData.map(t => t.totalRuns)}`;
          }
        }
      }
    }
  }
}
</script>

<style>

</style>
