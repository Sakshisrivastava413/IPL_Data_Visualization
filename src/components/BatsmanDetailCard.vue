<template>
  <div class="observation-card">
    <div class="card-body" v-if="player">
      <span class="card-heading">{{player.details.Player_Name}}</span>
      <h4 class="not-selected" style="font-weight: 300">{{player.teamDetails.Team_Name}}</h4>
      <p class="card-text">
        Total Runs Scored: <span class="text-value">{{player.totalRuns}}</span>
        <br />
        Total Matches Played: <span class="text-value">{{Object.keys(player.matches).length}}</span>
        <br />
        Total Centuries Earned: <span class="text-value">{{player.centuries}}</span>
        <br />
        Batting Hand: <span class="text-value">{{player.details.Batting_Hand}}</span>
        <br />
        Bowling Skill: <span class="text-value">{{player.details.Bowling_Skill}}</span>
      </p>
    </div>
    <div class="card-body" v-else>
      <p class="not-selected">
        Click any player bar to view more info.
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PlayerDetailCard',
  props: ['batsman'],
  watch: {
    batsman: {
      handler: function(newValue) {
        this.player = newValue;
        console.log(this.player)
      }
    }
  },
  data() {
    return {
      player: this.batsman
    }
  }
}
</script>

<style scoped>
  .card-heading {
    font-size: 24px;
    font-weight: 500;
    text-decoration: none;
  }
  .card-text {
    color: rgb(58, 180, 156)
  }
  .text-value {
    color: black
  }
  .not-selected {
    color: gray;
    font-size: 20px;
  }
  .card-container {
    display: inline-block;
    position: absolute;
    margin: 18px;
  }
  .observation-card {
    width: 24%;
    display: inline-block;
    position: absolute;
    margin: 12px;
    margin-top: 10%;
    padding: 12px;
    height: 30vh;
  }
</style>
<style>
  .card-container > div {
    width: 26vw;
    height: 30vh;
    margin-top: 17vh;
    border-radius: 14px;
    box-shadow: 1px 1px 2px 2px black;
  }
</style>
