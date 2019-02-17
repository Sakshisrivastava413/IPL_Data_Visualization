<template>
  <div>
    <Sunburst titleText="Teams Performance of all Seasons" />
    <BarChart
      titleText="Runs Per Team For All Seasons"
      chartType="bar"
      :chartData="TeamRunsChart.data"
      :chartOptions="TeamRunsChart.options" />
  </div>
</template>

<script>
import Sunburst from '../components/Sunburst.vue';
import BarChart from '../components/BarChart.vue';
import team_json from '../../json/teamOverallData.json';

export default {
  name: 'Team',
  components: {
    Sunburst,
    BarChart
  },
  data() {
    return {
      TeamRunsChart: {
        options: {},
        data: {
          labels: [],
          datasets: []
        }
      }
    }
  },
  mounted() {
    const teamName = [];
    Object.values(team_json).forEach(team => {
      teamName.push(team.shortCode);
      teamRuns.push(team.batting.runs);
    });
    this.TeamRunsChart.data = {
      labels: teamName,
      datasets: [{
        label: 'Total Runs',
         data: teamRuns,
         backgroundColor: '#22aa99'
      }
      ]
    };
    this.TeamRunsChart.options = {
      legend: {
         position: 'right' // place legend on the right side of chart
      },
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
    }
  }
}
</script>

<style>

</style>
