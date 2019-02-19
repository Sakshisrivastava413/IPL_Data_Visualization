<template>
  <div>
    <div class="sunburstChart">
      <Sunburst titleText="Teams Performance of all Seasons" />
    </div>
    <div class="bar-chart-container">
      <div class="barChart">
        <BarChart
          titleText="Runs Per Team For All Seasons"
          chartType="bar"
          :chartData="TeamRunsChart.data"
          :chartOptions="TeamRunsChart.options" />
      </div>
      <div class="chartObservation">
        <Observation />
      </div>
      <div class="barChart">
        <BarChart
          titleText="No of Wins / Loses of Teams For All Seasons"
          chartType="horizontalBar"
          :chartData="TeamWinLoseCountChart.data"
          :chartOptions="TeamWinLoseCountChart.options" />
      </div>
      <div class="chartObservation">
        <Observation />
      </div>
    </div>
  </div>
</template>

<script>
import Sunburst from '../components/Sunburst.vue';
import BarChart from '../components/BarChart.vue';
import Observation from '../components/Observation.vue';
import team_json from '../../json/teamOverallData.json';
import teamWinLose_json from '../../json/teamWinLoseCount.json';

export default {
  name: 'Team',
  components: {
    Sunburst,
    BarChart,
    Observation
  },
  data() {
    return {
      TeamRunsChart: {
        options: {},
        data: {
          labels: [],
          datasets: []
        }
      },
      TeamWinLoseCountChart: {
        options: {},
        data: {
          labels: [],
          datasets: []
        }
      }
    }
  },
  mounted() {
    const teamsRunDetails = [];

    Object.values(team_json).forEach(team => {
      teamsRunDetails.push({
        shortCode: team.shortCode,
        runs: team.batting.runs
      });
    });

    teamsRunDetails.sort((t1, t2) => t2.runs - t1.runs);

    this.TeamRunsChart.data = {
      labels: teamsRunDetails.map(t => t.shortCode),
      datasets: [{
        label: 'Total Runs',
         data: teamsRunDetails.map(t => t.runs),
         backgroundColor: '#5499C7'
      }
      ]
    };
    this.TeamRunsChart.options = {
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
    }

    const teamWinLoseDetails = [];

     Object.values(teamWinLose_json).forEach(team_detail => {
      teamWinLoseDetails.push({
        shortCode: team_detail.details.Team_Short_Code,
        wins: team_detail.wins,
        loses: team_detail.loses
      })
    });
    this.TeamWinLoseCountChart.data = {
      labels: teamWinLoseDetails.map(t => t.shortCode),
      datasets: [
        {
          label: 'No of Wins',
          data: teamWinLoseDetails.map(t => t.wins),
          backgroundColor: '#A4F67E'
        },
        {
          label: 'No of Loses',
          data: teamWinLoseDetails.map(t => t.loses),
          backgroundColor: '#F18F8C'
        },
      ]
    };
    this.TeamWinLoseCountChart.options = {
      responsive: true
    }
  }
}
</script>

<style scoped>
  .main-chart-container {
  }

  .barChart {
  margin: 20px;
  width: 60%;
  display: inline-block;
}
  .chartObservation {
  display: inline-block;
  position: absolute;
  margin: 18px;
}
</style>

<style>
.chartObservation > div {
  background: white;
  width: 31vw;
  height: 30vh;
  margin-top: 20vh;
  border-radius: 14px;
  box-shadow: 1px 1px 2px 2px black;
}
</style>
