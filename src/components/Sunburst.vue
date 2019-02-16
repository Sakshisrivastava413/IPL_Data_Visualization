<template>
<div>
  <div class="chart">
    <ChartTitle :title="titleText" />
    <chart-sunburst ref="chart" :data="chartData"></chart-sunburst>
  </div>
</div>
</template>

<script>
import { ChartSunburst } from "vue-d2b";
import ChartTitle from "./ChartTitle.vue";
import teams_details_json from "../../json/sunburstData.json";

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
</style>
