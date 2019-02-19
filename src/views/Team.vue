<template>
  <div>
      <Sunburst titleText="Teams Performance of all Seasons" />
      <div class="sunburst-card-container">
        <div class="sunburst-observation-card">
          <div class="chart-detail">
            <SunburstTreeView />
          </div>
        </div>
      </div>
    <div class="bar-chart-container">
      <div class="bar-chart">
        <BarChart
          titleText="Runs Per Team For All Seasons"
          chartType="bar"
          :chartData="TeamRunsChart.data"
          :chartOptions="TeamRunsChart.options"
        />
      </div>
      <div class="chart-observation">
        <div class="observation-card">
          Hi
        </div>
      </div>
      <div class="bar-chart">
        <BarChart
          titleText="No of Wins / Loses of Teams For All Seasons"
          chartType="horizontalBar"
          :chartData="TeamWinLoseCountChart.data"
          :chartOptions="TeamWinLoseCountChart.options"
        />
      </div>
      <div class="chart-observation">
        <div class="observation-card">
          Hi
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Sunburst from '../components/Sunburst.vue';
import BarChart from '../components/BarChart.vue';
import SunburstTreeView from '../components/SunburstTreeView.vue';
import team_json from '../../json/teamOverallData.json';
import teamWinLose_json from '../../json/teamWinLoseCount.json';

export default {
  name: 'Team',
  components: {
    Sunburst,
    BarChart,
    SunburstTreeView
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
.bar-chart {
  margin: 20px;
  width: 60vw;
  display: inline-block;
}
.chart-observation {
  margin: 18px;
  margin-top: 12%;
  position: absolute;
  display: inline-block;
}

.sunburst-card-container {
  margin-left: 80px;
}
</style>

<style>
.observation-card {
  width: 30vw;
  height: 30vh;
}

.sunburst-observation-card {
  width: 90%;
  height: 70vh;
  margin-top: 10px;
  border-radius: 14px;
  box-shadow: 1px 1px 2px 2px black;
}

.chart-detail {
  width: 100%;
padding-top: 20px;
}
</style>
