<template>
  <div>
    <Sunburst titleText="Teams Performance of all Seasons" />
    <div class="main-chart-container">
      <div class="runChart">
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
         backgroundColor: '#22aa99'
      }
      ]
    };
    this.TeamRunsChart.options = {
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
      scales: {
        yAxes: [{
          stacked: true, 
          gridLines: { display: false }
        }],
        xAxes: [{
          stacked: true,
        }]
      }
    }
  }
}
</script>

<style>
.main-chart-container {
  /* margin: 10px 80px */
  display: inline;

}
.runChart {
  margin: 10px 80px;
  width: 60%;
}
.chartObservation {
  float: right;
}
.barChart {
  width: 60%;
}
</style>
