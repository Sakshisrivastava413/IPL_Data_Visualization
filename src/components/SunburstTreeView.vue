<template>
  <div class="tf-tree example">
  <ul>
    <li>
      <span class="tf-nc" style="color: #4259CB">Team(s)</span>
      <ul>
        <li>
          <span class="tf-nc" style="color: #28B463">Batting Performance</span>
          <ul>
            <li>
              <span class="tf-nc" style="color: #E74C3C">Batsmen Hits</span>
              <ul>
                <li><span class="tf-nc" style="color: #17A589">Fours</span></li>
                <li><span class="tf-nc" style="color: #85929E">Sixes</span></li>
              </ul>
            </li>
            <li>
              <span class="tf-nc" style="color: #95A5A6">Extra Runs</span>
              <ul>
                <li><span class="tf-nc" style="color: #BA4A00">No Balls</span></li>
                <li><span class="tf-nc" style="color: #D68910">Wides</span></li>
                <li><span class="tf-nc" style="color: #138D75">Byes</span></li>
                <li><span class="tf-nc" style="color: #2980B9">Legbyes</span></li>
              </ul>
            </li>
          </ul>
        </li>
        <li>
          <span class="tf-nc" style="color: #5A80FF">Bowling Performance</span>
          <ul>
            <li>
              <span class="tf-nc" style="color: #F4D03F">Runs Conceded via Batsmen Hits</span>
              <ul>
                <li><span class="tf-nc" style="color: #17A589">Fours</span></li>
                <li><span class="tf-nc" style="color: #85929E">Sixes</span></li>
              </ul>
            </li>
            <li>
              <span class="tf-nc" style="color: #229954">Extra Runs Conceded</span>
              <ul>
                <li><span class="tf-nc" style="color: #BA4A00">No Balls</span></li>
                <li><span class="tf-nc" style="color: #D68910">Wides</span></li>
                <li><span class="tf-nc" style="color: #138D75">Byes</span></li>
                <li><span class="tf-nc" style="color: #2980B9">Legbyes</span></li>
              </ul>
            </li>
          </ul>
        </li>
      </ul>
    </li>
  </ul>
</div>
</template>

<script>
export default {
  name: "SunburstTreeView",
}
</script>

<style>
.tf-tree li {
  padding: 0px 0.2em;
}
</style>
