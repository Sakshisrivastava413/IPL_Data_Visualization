<template>
  <div id="app">
    <Header />
    <router-view></router-view>
  </div>
</template>

<script>
  import Header from "./components/Header.vue";
  export default {
    components: {
      Header
    }
  }
</script>

<style>
 #app {
  background-color: white;
  height: 1000px
}

.observation-card {
  border-radius: 14px;
  box-shadow: 1px 1px 2px 2px black;
}

</style>
