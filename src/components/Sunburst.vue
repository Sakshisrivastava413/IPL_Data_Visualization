<template>
<div>
  <div class="chart">
    <ChartTitle :title="titleText" />
    <chart-sunburst ref="chart" :data="chartData" :config="chartConfig"></chart-sunburst>
  </div>
</div>
</template>

<script>
import { ChartSunburst } from "vue-d2b";
import ChartTitle from "./ChartTitle.vue";
import teams_details_json from "../../json/teamOverallData.json";

export default {
  name: "Sunburst",
  props: [ 'titleText' ],
  components: {
    ChartSunburst,
    ChartTitle
  },
  data() {
    return {
      chartData: {
        label: "Team Details",
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
      }
    }
  },
  mounted() {
    Object.entries(teams_details_json).forEach(([key, team]) => {
      this.chartData.children.push({
        label: team.name,
        children: [
          {
            label: "Batting Performance",
            children: [
              {
                label: "Batsmans hits",
                children: [
                  {
                    label: "Fours",
                    size: team.batting.fours
                  },
                  {
                    label: "Sixes",
                    size: team.batting.sixes
                  }
                ]
              },
              {
                label: "Extra Runs",
                children: [
                  {
                    label: "Legbyes",
                    size: team.batting.legByesRuns
                  },
                  {
                    label: "Byes",
                    size: team.batting.byesRuns
                  },
                  {
                    label: "Wides",
                    size: team.batting.widesRuns
                  },
                  {
                    label: "No Ball",
                    size: team.batting.noBallsRuns
                  }
                ]
              }
            ]
          },
          {
            label: "Bowling Performance",
            children: [
              {
                label: "Batsmans hits",
                children: [
                  {
                    label: "Fours",
                    size: team.bowling.fours
                  },
                  {
                    label: "Sixes",
                    size: team.bowling.sixes
                  }
                ]
              },
              {
                label: "Extra Runs",
                children: [
                  {
                    label: "Legbyes",
                    size: team.bowling.legByesRuns
                  },
                  {
                    label: "Byes",
                    size: team.bowling.byesRuns
                  },
                  {
                    label: "Wides",
                    size: team.bowling.widesRuns
                  },
                  {
                    label: "No Ball",
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
  /* media query to force hide breadcrumbs when the screen is too small */
  @media screen and (max-width: 500px) {
    .d2b-breadcrumbs-frame {
      display: none;
      width: 0px !important;
      }
  }
</style>
