<template>
  <div class="main-container">
    <div class="chart-container">
      <Chart
        titleText="Top Venues"
        subTitleText="(Click bars to view more information about the stadium)"
        chartType="horizontalBar"
        :chartData="TopVenuesChart.data"
        :chartOptions="TopVenuesChart.options"
      />
    </div>
    <div class="observation-card">
      <p>
        <i><b>M Chinnaswamy Stadium</b> has only <b>3</b> matches won in every <b>29</b> matches when batting is picked first.
        The stadium always has favoured bowling first decisions.</i>
      </p>
      <hr />
      <p>
        <i><b>Eden Gardens</b> and <b>Wankhede Stadium</b> has been the most unpredictable and unbiased stadiums towards the team winning toss.</i>
      </p>
    </div>
    <ChartTitle title="Advanced Venue View" subTitle="(hover/click on cities/countries/venues to view more details)" />
    <div class="venue-map-container">
      <VenuesMap :focusVenue="focusVenue" />
    </div>
  </div>
</template>

<script>
import Chart from '../components/Chart.vue';
import ChartTitle from '../components/ChartTitle.vue';
import VenuesMap from '../components/VenuesMap.vue';
import VenueDetailCard from '../components/VenueDetailCard.vue';

import venue_json from '../../json/top10Venue.json';
import venueDetails from '../../json/venueDetails.json';

import { VENUE_COLOR } from '../teamColor.constants';

export default {
  name: 'Venue',
  components: {
    Chart,
    VenuesMap,
    ChartTitle,
    VenueDetailCard,
  },
  data() {
    return {
      topVenueData: [],
      focusVenue: null,
      TopVenuesChart: {
        options: {
          responsive: true,
          scales: {
            xAxes: [{
              ticks: { beginAtZero: true }
            }],
          },
          tooltips: {
            callbacks: {
              label: (tooltipItem) => {
                return `No. of matches played: ${tooltipItem.xLabel}
                  Total runs: ${this.topVenueData.find(v => v.vName == tooltipItem.yLabel).totalRuns}`;
              }
            }
          },
          onClick: (evt, item) => {
            if (item && item[0] && item[0]._index != null) {
              this.focusVenue = this.topVenueData[item[0]._index].vName;
            }
          }
        },
        data: {
          labels: [],
          datasets: []
        }
      }
    }
  },
  mounted() {
    const topVenueData = [];

    Object.values(venue_json).forEach(venue => {
      topVenueData.push({
        vName: venue.name,
        matchesPlayed: venue.matchesPlayed,
        totalRuns: venue.totalRuns
      })
    });
    this.TopVenuesChart.data = {
      labels: topVenueData.map(t => t.vName),
      datasets: [{
        label: 'Matches played',
         data: topVenueData.map(t => t.matchesPlayed),
         backgroundColor: VENUE_COLOR
      }]
    };
    this.topVenueData = topVenueData;
  }
}
</script>

<style scoped>
  .chart-container {
    margin: 20px;
    width: 70%;
    display: inline-block;
  }
  .observation-card {
    width: 24%;
    display: inline-block;
    position: absolute;
    margin: 8px;
    margin-top: 10%;
    padding: 8px;
    height: 40vh;
  }
  .venue-map-container {
    margin-top: 50px;
  }
</style>
<style>
  /* .observation-card {
    width: 21vw;
    height: 30vh;
  } */
</style>
