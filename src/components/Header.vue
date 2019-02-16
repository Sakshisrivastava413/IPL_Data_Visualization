<template>
  <div class="main-container">
    <nav class="navbar navbar-expand-md navbar-dark" style="background-color: #4D4D4D;">
      <a class="navbar-brand text-white" href="/">IPL VISUALIZE</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="navbar-nav">
          <router-link class="nav-item nav-link" to="/">Teams</router-link>
          <router-link class="nav-item nav-link" to="/player">Players</router-link>
          <router-link class="nav-item nav-link" to="/venue">Venues</router-link>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: "Header"
}
</script>

<style>
  .main-container {
    padding: 0px;
  }
</style>

