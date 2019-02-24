<template>
  <div class="main">
    <div class="chart-container">
      <Chart
        titleText="Top Venues"
        chartType="horizontalBar"
        :chartData="TopVenuesChart.data"
        :chartOptions="TopVenuesChart.options" />
    </div>
    <div class="chart-observation">
      <div class="observation-card">
        <p>Clearly, the highest number of matches have been played at Mumbai, followed by Bangalore, Kolkata and Delhi in order.</p>
      </div>
    </div>
    <div class="venue-map-container">
      <VenuesMap />
    </div>
  </div>

</template>

<script>
import Chart from '../components/Chart.vue';
import VenuesMap from '../components/VenuesMap.vue';
import venue_json from '../../json/top10Venue.json';

export default {
  name: 'Venue',
  components: {
    Chart,
    VenuesMap,
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
              Total runs: ${topVenueData.find(v => v.vName == tooltipItem.yLabel).totalRuns}`;
          }
        }
      }
    }
  }
}
</script>

<style scoped>

.chart-container {
  margin: 20px;
  width: 70%;
  display: inline-block;
  }
  .chart-observation {
  margin: 18px;
  margin-top: 10%;
  position: absolute;
  display: inline-block;
}
.venue-map-container {
 margin-top: 50px;
}
</style>
<style>
.observation-card {
  width: 21vw;
  height: 30vh;
}
</style>
