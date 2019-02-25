<template>
  <div>
    <Sunburst titleText="Teams Performance of all Seasons" subTitle="(select a team to view a team's overall performance in detail)" />
    <div class="sunburst-card-container">
      <div class="sunburst-observation-card">
        <button @click="showTreeView = !showTreeView" class="tog-btn">{{!showTreeView ? 'Open Chart Info':'Close View'}}</button>
        <div class="chart-detail" v-if="showTreeView">
          <SunburstTreeView />
        </div>
        <div class="sunburst-observation-text">
          <h3 style="margin-left: 20px">Some Observations</h3>
          <i>
          <ul>
            <li>
              <p>Mumbai Indians scored 6128 single runs which was highest of all.</p>
            </li>
            <li>
              <p>Royal Challengers Bangalore took highest number of sixes, 855!</p>
            </li>
            <li>
              <p>In terms of Bowling, RCB conceded the most (1060) extra runs and they still managed to score above among top 3.</p>
            </li>
            <li>
              <p>Rajasthan Royals scored maximum amount of threes, 63.</p>
            </li>
          </ul>
          </i>
        </div>
      </div>
    </div>
    <div style="display: inline-block">
    <Chart
      titleText="Runs Per Team"
      subTitleText="(for all seasons)"
      chartType="bar"
      :chartData="TeamRunsChart.data"
      :chartOptions="TeamRunsChart.options"
      :parentStyle="chartContainerStyle(1)"
    />
    <Chart
      titleText="No. of Wins / Loses"
      subTitleText="(for all seasons)"
      chartType="horizontalBar"
      :chartData="TeamWinLoseCountChart.data"
      :chartOptions="TeamWinLoseCountChart.options"
      :parentStyle="chartContainerStyle(1)"
    />
    </div>

    <Chart
      titleText="Win By Runs"
      chartType="bubble"
      :chartData="WinByRunsChart.data"
      :chartOptions="WinByRunsChart.options"
      :parentStyle="chartContainerStyle(0)"
    />
    <div class="observation-card">
      <i>
        <p>
          <b>Mumbai Indians</b> had the most maintained performance overall and <b>RCB</b> had the most powerful one.
          MI won a lot of matches within a score offset of 30 whereas RCB kicked off 7 teams with more than 70 runs to win.
        </p>
        <hr />
        <p>
          <b>Kings XI Punjab</b> had been the best target chasing team, they won <b>13 matches by 6 wickets</b> and <b>9 matches by 7</b> wickets.
        </p>
      </i>
    </div>

    <Chart
      titleText="Win By Wickets"
      chartType="bubble"
      :chartData="WinByWicketsChart.data"
      :chartOptions="WinByWicketsChart.options"
      :parentStyle="chartContainerStyle(0, 1)"
    />
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

import { BUBBLE_CHART_TEAM_COLOR, hexToRgbString } from '../teamColor.constants';

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
          },
          legend: { display: false }
        },
        data: {
          labels: [],
          datasets: []
        }
      },
      TeamWinLoseCountChart: {
        options: {
          responsive: true,
          legend: { display: false }
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
      },
      showTreeView: false
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
        loses: team_detail.loses,
        color: teamColorMap[team_detail.details.Team_Short_Code]
      });
    });

    teamWinLoseDetails.sort((t1, t2) => t2.wins - t1.wins);

    this.TeamWinLoseCountChart.data = {
      labels: teamWinLoseDetails.map(t => t.shortCode),
      datasets: [
        {
          label: "No of Wins",
          data: teamWinLoseDetails.map(t => t.wins),
          backgroundColor: teamWinLoseDetails.map(t => t.color)
        },
        {
          label: "No of Loses",
          data: teamWinLoseDetails.map(t => t.loses),
          backgroundColor: teamWinLoseDetails.map(t => t.color).map(color => hexToRgbString(color, 0.5))
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
    chartContainerStyle: (lessThanHalf, isLarge) => ({
      margin: '20px',
      width: lessThanHalf ? '46vw' : (isLarge ? '94vw' : '66vw'),
      display: 'inline-block'
    })
  },
};
</script>

<style scoped>

.tog-btn {
  border-radius: 4px;
  background: rgba(0,0,0, 0.7);
  color: white;
  outline: none;
  font-size: 18px;
}

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
  width: 24%;
  display: inline-block;
  position: absolute;
  margin: 8px;
  margin-top: 10%;
  padding: 8px;
  height: 40vh;
}

.sunburst-observation-card {
  width: 90%;
  height: 100% !important;
  margin-top: 10px;
  border-radius: 14px;
  box-shadow: 1px 1px 2px 2px black;
  padding: 8px;
}

.sunburst-observation-text {
  margin: 14px;
}

.chart-detail {
  width: 100%;
  padding-top: 20px;
}
</style>
