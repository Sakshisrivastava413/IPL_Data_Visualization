<template>
  <BarChart
          titleText="Top 10 Batsmen"
          chartType="bar"
          :chartData="TopBatsmanData.data"
          :chartOptions="TopBatsmanData.options" />
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
  },
  mounted() {
    const topBatsmenData = [];

    Object.values(batsman_json).forEach(team => {
        topBatsmenData.push({
          name: team.details.Player_Name,
          totalRuns: team.totalRuns
        });
    });

    this.TopBatsmanData.data = {
      labels: topBatsmenData.map(t => t.name),
      datasets: [{
        label: 'Total Runs',
         data: topBatsmenData.map(t => t.totalRuns),
         backgroundColor: '#7E94F6'
      }
      ]
    };
    this.TopBatsmanData.options = {
      scales: {
        xAxes: [{
          ticks: {
          beginAtZero: true,
          maxRotation: 0,
          minRotation: 0
          }
        }],
        yAxes: [{}],
      },
      tooltips: {mode: 'index',
            axis: 'y'

        },
      onHover: function(e) {
        console.log(e)
      }
    }
  }
}
</script>

<style>

</style>
