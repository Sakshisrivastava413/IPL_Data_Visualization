<template>
  <div class="main">
    <div class="barChart">
      <BarChart
        titleText="Top 10 Batsmen"
        chartType="bar"
        :chartData="TopBatsmanData.data"
        :chartOptions="TopBatsmanData.options"
      />
    </div>
    <div class="chartObservation">
      <Observation />
    </div>
  </div>
</template>

<script>
import BarChart from '../components/BarChart.vue';
import Observation from '../components/Observation.vue';
import batsman_json from '../../json/top10Batsmen.json';
export default {
  name: 'Player',
  components: {
    BarChart,
    Observation
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
         backgroundColor: '#76D7C4'
      }
      ]
    };
    this.TopBatsmanData.options = {
      responsive: true,
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
  .main {
    display: inline;
  }
  .barChart {
    margin: 0px 30px;
    width: 60%;
  }
  .chartObservation {
    float: right;
  }
</style>
