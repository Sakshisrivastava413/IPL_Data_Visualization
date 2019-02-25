<template>
  <div>
    <Chart
      titleText="Toss Decisions"
      subTitleText="(across all seasons)"
      chartType="horizontalBar"
      :chartData="TossDecisionChart.data"
      :chartOptions="TossDecisionChart.options"
      :parentStyle="chartContainerStyle(1)"
    />
    <Chart
      titleText="Toss Wins"
      subTitleText="(of all seasons)"
      chartType="bar"
      :chartData="MaximumTossWinnersChart.data"
      :chartOptions="MaximumTossWinnersChart.options"
      :parentStyle="chartContainerStyle(1)"
    />
    <Chart
      titleText="Matches Played"
      subTitleText="(across all seasons)"
      chartType="bar"
      :chartData="TotalMatchesPlayedChart.data"
      :chartOptions="TotalMatchesPlayedChart.options"
      :parentStyle="chartContainerStyle(1)"
    />
    <Chart
      titleText="Team Runs Distribution"
      subTitleText="(of all seasons)"
      chartType="pie"
      :chartData="RunDistributionChart.data"
      :chartOptions="RunDistributionChart.options"
      :parentStyle="chartContainerStyle(1)"
    >
      <div class="team-select-container">
        <h4 style="display: inline-block; font-weight: 300">Select a team</h4>&nbsp;
        <select  style="display: inline-block" @change="teamChange">
          <option v-for="code in teamCodes" :key="code" :value="code">{{code}}</option>
        </select>
      </div>
    </Chart>
  </div>
</template>

<script>
import Chart from "../components/Chart.vue";

import tossDecision_json from "../../json/tossDecisionAccrossSeasons.json";
import totalMatches_json from "../../json/matchesPlayedAccrossEachSeason.json";
import maximumTossWinners_json from '../../json/maximumTossWinners.json';
import team_json from "../../json/teamOverallData.json";

import { BUBBLE_CHART_TEAM_COLOR } from '../teamColor.constants';

export default {
  name: "Season",
  components: {
    Chart
  },
  watch: {
    focusedTeam: {
      handler: function() {
        this.RunDistributionChart.data = {
          labels: ['Singles', 'Twos', 'Threes', 'Fours', 'Fives', 'Sixes'],
          datasets: [{
            labels: ['Singles', 'Twos', 'Threes', 'Fours', 'Fives', 'Sixes'],
            data: [
              team_json[this.focusedTeam]['batting'].ones,
              team_json[this.focusedTeam]['batting'].twos,
              team_json[this.focusedTeam]['batting'].threes,
              team_json[this.focusedTeam]['batting'].fours,
              team_json[this.focusedTeam]['batting'].fives,
              team_json[this.focusedTeam]['batting'].sixes,
            ],
            backgroundColor: [
              "#2ecc71",
              "#3498db",
              "#95a5a6",
              "#9b59b6",
              "#f1c40f",
              "#e74c3c",
            ],
          }]
        };
      }
    }
  },
  data() {
    return {
      TossDecisionChart: {
        options: {
          responsive: true
        },
        data: {
          labels: [],
          datasets: []
        }
      },
      MaximumTossWinnersChart: {
        options: {
          responsive: true,
          legend: { display: false },
        },
        data: {
          labels: [],
          datasets: []
        }
      },
      TotalMatchesPlayedChart: {
        options: {
          responsive: true
        },
        data: {
          labels: [],
          datasets: []
        }
      },
      RunDistributionChart: {
        options: {
          responsive: true
        },
        data: {
          labels: [],
          datasets: []
        }
      },
      focusedTeam: null,
      teamCodes: []
    }
  },
  methods: {
    chartContainerStyle: (lessThanHalf) => ({
      margin: '20px',
      width: lessThanHalf ? '46vw' : '66vw',
      display: 'inline-block'
    }),
    teamChange(event) {
      this.focusedTeam = Object.keys(team_json)
        .map(key => team_json[key])
        .findIndex(t => t.shortCode == event.target.value) + 1;
    }
  },
  mounted() {
    // Tean Run Chart
    const tossDecisionDetails = [];
    Object.values(tossDecision_json).forEach(season => {
      tossDecisionDetails.push({
        bat: season.batDecisions,
        ball: season.ballDecisions,
      });
    });
    this.TossDecisionChart.data = {
      labels: tossDecisionDetails.map((_, i) => i + 2008),
      datasets: [
        {
          label: "Batting",
          data: tossDecisionDetails.map(t => t.bat),
          backgroundColor: "#86E7FF"
        },
        {
          label: "Bowling",
          data: tossDecisionDetails.map(t => t.ball),
          backgroundColor: "#B4EB79"
        }
      ]
    };

    const tossWinnersDetails = [];
    Object.values(maximumTossWinners_json).forEach((team, i) => {
      tossWinnersDetails.push({
        label: team.tsc,
        data: team.wins,
        backgroundColor: BUBBLE_CHART_TEAM_COLOR[i]
      });
    });
    this.MaximumTossWinnersChart.data = {
      labels: tossWinnersDetails.map(t => t.label),
      datasets: [{
        label: tossWinnersDetails.map(t => t.label),
        data: tossWinnersDetails.map(t => t.data),
        backgroundColor: tossWinnersDetails.map(t => t.backgroundColor)
      }]
    };

    this.TotalMatchesPlayedChart.data = {
      labels: tossDecisionDetails.map((_, i) => i + 2008),
      datasets: [
        {
          label: "Total matches",
          data: totalMatches_json,
          backgroundColor: "#61B16D"
        }
      ]
    };

    this.teamCodes = Object.keys(team_json).map(i => team_json[i].shortCode);
    this.focusedTeam = 1;
  }
}
</script>

<style scoped>
  .team-select-container {
    margin-left: 10%;
  }
  select {
      width: 150px;
      margin: 10px;
      font-size: 16px;
  }
  select:focus {
      min-width: 150px;
      width: auto;
  }
</style>