<template>
  <div class="card-container">
    <div class="card-body" v-if="player">
      <h5 class="card-title">{{player.details.Player_Name}}</h5>
      <h6 class="card-subtitle mb-2 text-muted">{{player.teamDetails.Team_Name}}</h6>
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
