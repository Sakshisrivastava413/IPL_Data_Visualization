<template>
  <div class="main">
    <Chart
      titleText="Top 10 Batsmen"
      chartType="bar"
      :chartData="TopBatsmanData.data"
      :chartOptions="TopBatsmanData.options"
      :parentStyle="chartContainerStyle"
    />
    <BatsmanDetailCard :batsman="focusedBatman" />

    <Chart
      titleText="Highest Man Of the Match Winners"
      chartType="bar"
      :chartData="TopManOfTheMatchData.data"
      :chartOptions="TopManOfTheMatchData.options"
      :parentStyle="chartContainerStyle"
    />
    <BatsmanDetailCard :batsman="focusedBatman2" />
  </div>
</template>

<script>
import Chart from '../components/Chart.vue';
import BatsmanDetailCard from '../components/BatsmanDetailCard.vue';

import manOfTheMatch_json from '../../json/topManOfTheMatch.json';
import batsman_json from '../../json/top10Batsmen.json';
import match_json from '../../json/matchData.json';

export default {
  name: 'Player',
  components: {
    Chart,
    BatsmanDetailCard,
  },
  data() {
    return {
      chartContainerStyle: {
        margin: '20px',
        width: '66vw',
        display: 'inline-block'
      },
      TopBatsmanData: {
        options: {
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
            if (item && item[0] && item[0]._index != null) {
              this.focusedBatman = batsman_json[item[0]._index];
            }
          }
        },
        data: {
          labels: [],
          datasets: []
        }
      },
      TopManOfTheMatchData: {
        options: {
          responsive: true,
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true,
                maxRotation: 0,
                minRotation: 0
              }
            }],
          },
          onClick: (evt, item) => {
            if (item && item[0] && item[0]._index != null) {
              this.focusedBatman2 = batsman_json[item[0]._index];
            }
          }
        },
        data: {
          labels: [],
          datasets: []
        }
      },
      focusedBatman: null,
      focusedBatman2: null
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
      }]
    };

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
      }]
    };
  }
}
</script>
<style scoped>
  .chart-container {
    margin: 20px;
    width: 70%;
    display: inline-block;
  }
</style>

<style>
  .card-container > div {
    width: 26vw;
    height: 30vh;
    margin-top: 17vh;
    border-radius: 14px;
    box-shadow: 1px 1px 2px 2px black;
  }
</style>