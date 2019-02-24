<template>
  <div>
    <p>
      Total Matches Played:
      <span class="venue-detail">
        {{ focusedVenue && focusedVenue.info.matchesPlayed }}
      </span>
    </p>
    <p>
      Total Runs:
      <span class="venue-detail">
        {{ focusedVenue && focusedVenue.info.totalRuns }}
      </span>
    </p>
    <p>
      Highest Total Recorded:
      <br />
      <span class="venue-detail" style="color: green">
        {{ focusedVenue && `${focusedVenue.info.highestRecodedMatch.runs} / ${focusedVenue.info.highestRecodedMatch.totalOuts} (${focusedVenue.info.highestRecodedMatch.overs} overs) by ${focusedVenue.info.highestRecodedMatch.byTeam.Team_Name}` }}
      </span>
    </p>
    <p>
      Lowest Total Recorded:
      <br />
      <span class="venue-detail" style="color: red">
        {{ focusedVenue && `${focusedVenue.info.lowestRecordedMatch.runs} / ${focusedVenue.info.lowestRecordedMatch.totalOuts} (${focusedVenue.info.lowestRecordedMatch.overs} overs) by ${focusedVenue.info.lowestRecordedMatch.byTeam.Team_Name}` }}
      </span>
    </p>
    <div>
      <Chart
        chartType="pie"
        :chartData="venuePieChart.data"
        :chartOptions="venuePieChart.options"
      />
    </div>
  </div>
</template>

<script>
import Chart from './Chart.vue';
export default {
  name: 'VenueDetailCard',
  components: { Chart },
  props: ['venue'],
  watch: {
    venue: {
      handler: function(newVenue) {
        this.focusedVenue = newVenue;
      }
    },
    focusedVenue: {
      handler: function() {
        const {
          matchesWonBattingFirst,
          matchesWonBowlingFirst
        } = this.focusedVenue.info;
        this.venuePieChart = {
          data: {
            datasets: [
              {
                data: [
                  matchesWonBattingFirst,
                  matchesWonBowlingFirst
                ],
                backgroundColor: ['#88E199', '#20DAFF']
              },
            ],
            labels: ['Matches Won Batting First', 'Matches won Bowling First']
          },
        };
      }
    }
  },
  data() {
    return {
      focusedVenue: this.venue,
      venuePieChart: {
        data: {},
        options: {
          animation: { duration: 0 }
        }
      }
    }
  }
}
</script>

<style>

</style>
