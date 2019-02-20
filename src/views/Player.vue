<template>
  <div class="main">
    <div class="chart-container">
      <BarChart
        titleText="Top 10 Batsmen"
        chartType="bar"
        :chartData="TopBatsmanData.data"
        :chartOptions="TopBatsmanData.options"
      />
    </div>
    <div class="card-container" v-if="focusedBatman">
      <div class="card-body">
        <h5 class="card-title">{{focusedBatman.details.Player_Name}}</h5>
        <h6 class="card-subtitle mb-2 text-muted">{{focusedBatman.teamDetails.Team_Name}}</h6>
        <p class="card-text">
          Total Runs Scored: <span class="text-value">{{focusedBatman.totalRuns}}</span>
          <br />
          Total Matches Played: <span class="text-value">{{Object.keys(focusedBatman.matches).length}}</span>
          <br />
          Total Centuries Earned: <span class="text-value">{{focusedBatman.centuries}}</span>
        </p>
      </div>
    </div>
    <div class="card-container" style="width: 18rem;" v-else>
      <div class="card-body">
        <p class="not-selected">
          Click any player bar to show more.
        </p>
      </div>
    </div>

    <div class="chart-container">
      <BarChart
        titleText="Highest Man Of the Matches Winners"
        chartType="bar"
        :chartData="TopManOfTheMatchData.data"
        :chartOptions="TopManOfTheMatchData.options"
      />
    </div>
    <div class="card-container" v-if="focusedBatman">
      <div class="card-body">
        <h5 class="card-title">{{focusedBatman.details.Player_Name}}</h5>
        <h6 class="card-subtitle mb-2 text-muted">{{focusedBatman.teamDetails.Team_Name}}</h6>
        <p class="card-text">
          Total Runs Scored: <span class="text-value">{{focusedBatman.totalRuns}}</span>
          <br />
          Total Matches Played: <span class="text-value">{{Object.keys(focusedBatman.matches).length}}</span>
          <br />
          Total Centuries Earned: <span class="text-value">{{focusedBatman.centuries}}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import BarChart from '../components/BarChart.vue';
import batsman_json from '../../json/top10Batsmen.json';
import manOfTheMatch_json from '../../json/topManOfTheMatch.json';
import match_json from '../../json/matchData.json';
export default {
  name: 'Player',
  components: {
    BarChart
  },
  data() {
    return {
      TopBatsmanData: {
        options: {},
        data: {
          labels: [],
          datasets: []
        }
      },
      TopManOfTheMatchData: {
        options: {},
        data: {
          labels: [],
          datasets: []
        }
      },
      focusedBatman: null
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
      },
      onClick: (evt, item) => {
        this.focusedBatman = batsman_json[item[0]._index]
      }
    }

    const TopManOfTheMatchDetail = [];
    Object.values(manOfTheMatch_json).forEach(player => {
        TopManOfTheMatchDetail.push({
          name: player.details.Player_Name,
          total: player.total
        });
    });

    this.TopManOfTheMatchData.data = {
      labels: TopManOfTheMatchDetail.map(t => t.name),
      datasets: [{
        label: 'No Of Awards',
         data: TopManOfTheMatchDetail.map(t => t.total),
         backgroundColor: '#F36D9C'
      }
      ]
    };
    this.TopManOfTheMatchData.options = {
      responsive: true,
      scales: {
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

<style scoped>
  .card-text {
    color: rgb(58, 180, 156)
  }
  .text-value {
    color: black
  }
  .not-selected {
    color: gray;
    font-size: 20px;
  }
  .chart-container {
  margin: 20px;
  margin-top: 0px;
  width: 60%;
  display: inline-block;
  }
  .card-container {
    display: inline-block;
    position: absolute;
    margin: 18px;
  }
</style>
<style>
.card-container > div {
  width: 31vw;
  height: 30vh;
  margin-top: 17vh;
  border-radius: 14px;
  box-shadow: 1px 1px 2px 2px black;
}
</style>