<template>
  <div style="margin-top: 76px">
    <ChartTitle :title="titleText" :subTitle="subTitle" />
    <div class="chart-container">
      <chart-sunburst ref="chart" :data="chartData" :config="chartConfig"></chart-sunburst>
    </div>
  </div>
</template>

<script>
import { ChartSunburst } from "vue-d2b";
import ChartTitle from "./ChartTitle.vue";
import { TEAM_COLOR } from "../teamColor.constants";
import teams_details_json from "../../json/teamOverallData.json";

export default {
  name: "Sunburst",
  props: ['titleText', 'subTitle'],
  components: {
    ChartSunburst,
    ChartTitle
  },
  data() {
    return {
      chartData: {
        label: "Team Details",
        color: "#4259CB",
        children: []
      },
      chartConfig: function(chart) {
        chart.tooltip().html(function(data) {
          let size = 0;
          if (!data.children || !data.children.length)
            return `${data.label} ${data.value}`;
          if (
            data.label == "Extra Runs" ||
            data.label == "Boundaries" ||
            data.label == "Non Boundaries"
          ) {
            size = data.children.reduce((acc, d) => acc + d.size, 0);
          }

          return `${data.label} ${size != 0 ? size : ""}`;
        });
        chart.color(function (d) {
	        return d.color
        })
      }
    }
  },
  mounted() {
    const teamNameColor = TEAM_COLOR;
    Object.entries(teams_details_json).forEach(([key, team]) => {
      this.chartData.children.push({
        label: team.name,
        color: teamNameColor[key],
        children: [
          {
            label: "Batting Performance",
            color: "#28B463",                
            children: [
              {
                label: "Batsmen hits",
                color: '#E74C3C',
                children: [
                  {
                    label: "Boundaries",
                    color: '#E74C3C',
                    children: [
                      {
                        label: "Fours",
                        color: "#17A589",
                        size: team.batting.fours
                      },
                      {
                        label: "Sixes",
                        color: "#85929E",
                        size: team.batting.sixes
                      }
                    ]
                  },
                  {
                    label: "Non Boundaries",
                    color: 'pink',
                    children: [
                      {
                        label: "Ones",
                        color: "#17A589",
                        size: team.batting.ones
                      },
                      {
                        label: "Twos",
                        color: "red",
                        size: team.batting.twos
                      },
                      {
                        label: "Threes",
                        color: "green",
                        size: team.batting.threes
                      },
                      {
                        label: "Fives",
                        color: "black",
                        size: team.batting.fives
                      }
                    ]
                  },
                ]
              },
              {
                label: "Extra Runs",
                color: "#95A5A6",
                children: [
                  {
                    label: "Legbyes",
                    color: "#2980B9",
                    size: team.batting.legByesRuns,
                  },
                  {
                    label: "Byes",
                    color: "#138D75",
                    size: team.batting.byesRuns
                  },
                  {
                    label: "Wides",
                    color: "#D68910",
                    size: team.batting.widesRuns
                  },
                  {
                    label: "No Ball",
                    color: "#BA4A00",
                    size: team.batting.noBallsRuns
                  }
                ]
              }
            ]
          },
          {
            label: "Bowling Performance",
            color: '#5A80FF',
            children: [
              {
                label: "Runs Conceded via Batsmen hits",
                color: "#F4D03F",
                children: [
                  {
                    label: "Boundaries",
                    color: '#E74C3C',
                    children: [
                      {
                        label: "Fours",
                        color: "#17A589",
                        size: team.bowling.fours
                      },
                      {
                        label: "Sixes",
                        color: "#85929E",
                        size: team.bowling.sixes
                      }
                    ]
                  },
                  {
                    label: "Non Boundaries",
                    color: 'pink',
                    children: [
                      {
                        label: "Ones",
                        color: "#17A589",
                        size: team.bowling.ones
                      },
                      {
                        label: "Twos",
                        color: "red",
                        size: team.bowling.twos
                      },
                      {
                        label: "Threes",
                        color: "green",
                        size: team.bowling.threes
                      },
                      {
                        label: "Fives",
                        color: "black",
                        size: team.bowling.fives
                      }
                    ]
                  },
                ]
              },
              {
                label: "Extra Runs Conceded",
                color: "#229954",
                children: [
                  {
                    label: "Legbyes",
                    color: "#2874A6",
                    size: team.bowling.legByesRuns
                  },
                  {
                    label: "Byes",
                    color: "#1E8449",
                    size: team.bowling.byesRuns
                  },
                  {
                    label: "Wides",
                    color: "#D4AC0D",
                    size: team.bowling.widesRuns
                  },
                  {
                    label: "No Ball",
                    color: "#CA6F1E",
                    size: team.bowling.noBallsRuns
                  }
                ]
              }
            ]
          }
        ]
      });
    });
  }
};
</script>

<style scoped>
  .chart-container {
    width: 100%;
    height: 63vh;
    display: inline-block;
  }

  /* media query to force hide breadcrumbs when the screen is too small */
  @media screen and (max-width: 500px) {
    .d2b-breadcrumbs-frame {
      display: none;
      width: 0px !important;
    }
  }
</style>
