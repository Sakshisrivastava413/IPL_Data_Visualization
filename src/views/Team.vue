<template>
  <div>
    <Sunburst titleText="Teams Performance of all Seasons"/>
    <div class="sunburst-card-container">
      <div class="sunburst-observation-card">
        <div class="chart-detail">
          <SunburstTreeView/>
        </div>
      </div>
    </div>
    <Chart
      titleText="Runs Per Team For All Seasons"
      chartType="bar"
      :chartData="TeamRunsChart.data"
      :chartOptions="TeamRunsChart.options"
      :parentStyle="chartContainerStyle()"
    />
    <div class="chart-observation">
      <div class="observation-card">Hi</div>
    </div>
    <Chart
      titleText="No of Wins / Loses of Teams For All Seasons"
      chartType="horizontalBar"
      :chartData="TeamWinLoseCountChart.data"
      :chartOptions="TeamWinLoseCountChart.options"
      :parentStyle="chartContainerStyle()"
    />
    <div class="chart-observation">
      <div class="observation-card">Hi</div>
    </div>

    <Chart
      titleText="Win By Runs for each Team"
      chartType="bubble"
      :chartData="WinByRunsChart.data"
      :chartOptions="WinByRunsChart.options"
      :parentStyle="chartContainerStyle()"
    />
    <div class="chart-observation">
      <div class="observation-card">Hi</div>
    </div>

    <Chart
      titleText="Win By Wickets for each Team"
      chartType="bubble"
      :chartData="WinByWicketsChart.data"
      :chartOptions="WinByWicketsChart.options"
      :parentStyle="chartContainerStyle(1)"
    />
    <div class="chart-observation">
      <div class="observation-card">Hi</div>
    </div>
  </div>
</template>

<script>
import SunburstTreeView from "../components/SunburstTreeView.vue";
import Sunburst from "../components/Sunburst.vue";
import Chart from "../components/Chart.vue";

import team_json from "../../json/teamOverallData.json";
import teamData from '../../json/teamData.json'
import winBy_json from "../../json/winTypeData.json";
import teamWinLose_json from "../../json/teamWinLoseCount.json";

import { BUBBLE_CHART_TEAM_COLOR } from '../teamColor.constants';

export default {
  name: "Team",
  components: {
    Sunburst,
    Chart,
    SunburstTreeView
  },
  data() {
    return {
      teamWinLoseDetails: [],
      TeamRunsChart: {
        options: {
          responsive: true,
          tooltips: {
            callbacks: {
              label: function(tooltipItems) {
                const team = teamData.find(t => t.Team_Short_Code == tooltipItems.xLabel);
                return `${team.Team_Name}
                 ${tooltipItems.yLabel} Runs`;
              }
            }
          }
        },
        data: {
          labels: [],
          datasets: []
        }
      },
      TeamWinLoseCountChart: {
        options: {
          responsive: true,
        },
        data: {
          labels: [],
          datasets: []
        }
      },
      WinByRunsChart: {
        options: {
          responsive: true,
          scales: {
            yAxes: [{ ticks: { max: 150 } }],
            xAxes: [{ display: false }]
          },
          tooltips: {
            callbacks: {
              label: function(tooltipItems) {
                return tooltipItems.yLabel + " Runs";
              }
            }
          }
        },
        data: {
          labels: [],
          datasets: []
        }
      },
      WinByWicketsChart: {
        options: {
          responsive: true,
          scales: {
            yAxes: [{ ticks: { max: 11 } }],
            xAxes: [{ display: false }]
          },
          tooltips: {
            callbacks: {
              label: function(tooltipItems) {
                return tooltipItems.yLabel + " Wickets";
              }
            }
          }
        },
        data: {
          labels: [],
          datasets: []
        }
      }
    };
  },
  mounted() {

    // Tean Run Chart
    const teamsRunDetails = [];
    const teamColorMap = {};

    Object.values(team_json).forEach(team => {
      teamsRunDetails.push({
        shortCode: team.shortCode,
        runs: team.batting.runs
      });
    });

    teamsRunDetails.sort((t1, t2) => {
      return t2.runs - t1.runs
    });

    teamsRunDetails.forEach((t, i) => teamColorMap[t.shortCode] = BUBBLE_CHART_TEAM_COLOR[i]);

    this.TeamRunsChart.data = {
      labels: teamsRunDetails.map(t => t.shortCode),
      datasets: [
        {
          label: "Total Runs",
          data: teamsRunDetails.map(t => t.runs),
          backgroundColor: Object.values(teamColorMap)
        }
      ]
    };

    // team Win Lose Chart Details
    const teamWinLoseDetails = [];
    Object.values(teamWinLose_json).forEach(team_detail => {
      teamWinLoseDetails.push({
        shortCode: team_detail.details.Team_Short_Code,
        wins: team_detail.wins,
        loses: team_detail.loses
      });
    });
    this.TeamWinLoseCountChart.data = {
      labels: teamWinLoseDetails.map(t => t.shortCode),
      datasets: [
        {
          label: "No of Wins",
          data: teamWinLoseDetails.map(t => t.wins),
          backgroundColor: "#61B96D"
        },
        {
          label: "No of Loses",
          data: teamWinLoseDetails.map(t => t.loses),
          backgroundColor: "#F18F8C"
        }
      ]
    };
    this.teamWinLoseDetails = teamWinLoseDetails;

    // Team Win By Runs Chart Details
    const teamWinByRuns = [];
    const teamName = [];

    const teamDetails = [];

    winBy_json.forEach(team => {
      teamName.push(team.teamShortCode);
      team.winByRuns.forEach(res => {
        teamWinByRuns.push({
          x:
            Number(team.teamId) +
            (Math.random() > 0.5 ? (Math.random() > 0.5 ? 0.12 : 0) : -0.12),
          y: res,
          r: 4,
          teamId: team.teamId
        });
      });
    });

    teamWinByRuns.forEach(team => {
      teamDetails[Number(team.teamId) - 1] =
        teamDetails[Number(team.teamId) - 1] || [];
      teamDetails[Number(team.teamId) - 1].push(team);
    });

    const datasets = [];
    teamDetails.forEach((teamData, index) => {
      datasets.push({
        label: teamName[index],
        data: teamData,
        backgroundColor: teamColorMap[teamName[index]],
        borderColor: "#58595b"
      });
    });

    this.WinByRunsChart.data = {
      ...this.WinByRunsChart,
      datasets
    };

    // Win By Wicket Chart
    const teamWinByWicket = [];
    const anotherTeamDetails = [];


    const repMap = {};
    winBy_json.forEach(team => {
      team.winByWickets.forEach(res => {
        const teamRep = repMap[team.teamId] || {
          [res]: 0
        };

        if (!teamRep[res]) teamRep[res] = 0;
        teamRep[res]++;
        repMap[team.teamId] = teamRep;
        let offset = Number(team.teamId);
        for (let i = 0; i < Math.floor(teamRep[res] / 2); i++) {
          if (teamRep[res] % 2 == 0) {
            offset += 0.09;
          } else {
            offset -= 0.09;
          }
        }

        teamWinByWicket.push({
          x: offset,
          y: res,
          r: 4,
          teamId: team.teamId
        });
      });
    });

    teamWinByWicket.forEach(team => {
      anotherTeamDetails[Number(team.teamId) - 1] =
        anotherTeamDetails[Number(team.teamId) - 1] || [];
      anotherTeamDetails[Number(team.teamId) - 1].push(team);
    });

    const anotherDatasets = [];
    anotherTeamDetails.forEach((teamData, index) => {
      anotherDatasets.push({
        label: teamName[index],
        data: teamData,
        backgroundColor: teamColorMap[teamName[index]],
        borderColor: "#58595b"
      });
    });
    this.WinByWicketsChart.data = {
      ...this.WinByWicketsChart,
      datasets: anotherDatasets
    };
  },
  methods: {
    chartContainerStyle: isLarge => ({
      margin: '20px',
      width: isLarge ? '94vw' : '66vw',
      display: 'inline-block'
    })
  },
};
</script>

<style scoped>

.bubble-chart {
  margin: 20px;
  width: 72vw;
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
