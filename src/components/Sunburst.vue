<template>
<div>
  <div class="chart">
    <ChartTitle :title="titleText" />
    <chart-sunburst ref="chart" :data="chartData" :config="chartConfig"></chart-sunburst>
    <div class="observation">
      <Observation />
    </div>
  </div>
</div>
</template>

<script>
import { ChartSunburst } from "vue-d2b";
import ChartTitle from "./ChartTitle.vue";
import Observation from "./Observation.vue";
import teams_details_json from "../../json/teamOverallData.json";

export default {
  name: "Sunburst",
  props: [ 'titleText' ],
  components: {
    ChartSunburst,
    ChartTitle,
    Observation
  },
  data() {
    return {
      chartData: {
        label: "Team Details",
        color: "#D0D3D4",
        children: []
      },
      chartConfig: function(chart) {
        chart.tooltip().html(function(data) {
          let size = 0;
          if (!data.children || !data.children.length)
            return `${data.label} ${data.value}`;
          if (data.label == "Batsmans hits" || data.label == "Extra Runs") {
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
    const teamNameColor = [
      '',
      '#C7A9F9',
      '#F2C5A6',
      '#E9B1F0',
      '#F5E6AC',
      '#F2A9A9',
      '#D3F0A3',
      '#FFB8D2',
      '#9FF1DC',
      '#BF9898',
      '#569BEE',
      '#A8D0FF',
      '#F3D2A3',
      '#889EFF'
    ];

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
                label: "Batsmans hits",
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
                label: "Batsmans hits",
                color: "#F4D03F",
                children: [
                  {
                    label: "Fours",
                    color: "#C0392B",
                    size: team.bowling.fours
                  },
                  {
                    label: "Sixes",
                    color: "#884EA0",
                    size: team.bowling.sixes
                  }
                ]
              },
              {
                label: "Extra Runs",
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
  .chart {
    width: 100%;
    height: 500px;
    margin-top: 30px;
  }
  .observation {
    margin: 10px 30px;
  }
  /* media query to force hide breadcrumbs when the screen is too small */
  @media screen and (max-width: 500px) {
    .d2b-breadcrumbs-frame {
      display: none;
      width: 0px !important;
      }
  }
</style>
