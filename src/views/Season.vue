<template>
  <div>
    <Chart
      titleText="Toss Decision Across All Seasons"
      chartType="horizontalBar"
      :chartData="TossDecisionChart.data"
      :chartOptions="TossDecisionChart.options"
      :parentStyle="chartContainerStyle()"
    />
    <div class="chart-observation">
      <div class="observation-card">Hi</div>
    </div>
    <Chart
      titleText="Matches Played Across All Seasons"
      chartType="bar"
      :chartData="TotalMatchesPlayedChart.data"
      :chartOptions="TotalMatchesPlayedChart.options"
      :parentStyle="chartContainerStyle()"
    />
    <div class="chart-observation">
      <div class="observation-card">Hi</div>
    </div>
  </div>
</template>

<script>
import Chart from "../components/Chart.vue";
import tossDecision_json from "../../json/tossDecisionAccrossSeasons.json";
import totalMatches_json from "../../json/matchesPlayedAccrossEachSeason.json";

export default {
  name: "Season",
  components: {
    Chart
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
      TotalMatchesPlayedChart: {
        options: {
          responsive: true
        },
        data: {
          labels: [],
          datasets: []
        }
      }
    }
  },
  methods: {
    chartContainerStyle: isLarge => ({
      margin: '20px',
      width: isLarge ? '94vw' : '66vw',
      display: 'inline-block'
    })
  },
  mounted() {
    // Tean Run Chart
    const TossDecisionDetails = [];

    Object.values(tossDecision_json).forEach(season => {
      TossDecisionDetails.push({
        bat: season.batDecisions,
        ball: season.ballDecisions
      });
    });
      console.log(TossDecisionDetails)

    this.TossDecisionChart.data = {
      labels: [],
      datasets: [
        {
          label: "Batting",
          data: TossDecisionDetails.map(t => t.bat),
          backgroundColor: "#61B16D"
        },
        {
          label: "Bowling",
          data: TossDecisionDetails.map(t => t.ball),
          backgroundColor: "#D12F1C"
        }
      ]
    };

    this.TotalMatchesPlayedChart.data = {
      labels: [],
      datasets: [
        {
          label: "total matches",
          data: totalMatches_json.map(t => t),
          backgroundColor: "#61B16D"
        }
      ]
    };
  }
}
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
