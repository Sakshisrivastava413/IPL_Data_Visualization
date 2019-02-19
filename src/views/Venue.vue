<template>
<div class="main">
    <div class="chart-container">
      <BarChart
        titleText="Top Venues"
        chartType="horizontalBar"
        :chartData="TopVenuesChart.data"
        :chartOptions="TopVenuesChart.options" />
    </div>
    <div class="venue-card-container">
    </div>
  </div>
 
</template>

<script>
import BarChart from '../components/BarChart.vue';
import venue_json from '../../json/top10Venue.json';
export default {
  name: 'Venue',
  components: {
    BarChart
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
  margin-top: 0px;
  width: 70%;
  display: inline-block;
  }
  .venue-card-container {
    display: inline-block;
    position: absolute;
    margin: 18px;
  }
</style>
<style>
.venue-card-container > div {
  width: 21vw;
  height: 30vh;
  margin-top: 17vh;
  border-radius: 14px;
  box-shadow: 1px 1px 2px 2px black;
}
</style>
