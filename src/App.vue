<template>
  <div id="app">
    <Header />
    <transition name="page" mode="out-in">
      <router-view style="margin-top: 40px"></router-view>
    </transition>
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
  }

  * {
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  }

  .page-enter-active, .page-leave-active {
    transition: opacity 0.2s;
  }

  .page-enter, .page-leave-to {
    opacity: 0;
  }

  .observation-card {
    border-radius: 14px;
    box-shadow: 1px 1px 2px 2px black;
  }
</style>
