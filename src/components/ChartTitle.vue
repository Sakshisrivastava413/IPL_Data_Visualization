<template>
  <div>
    <p class="heading">
      {{ title }}
      <span v-if="subTitle" class="subtitle">{{subTitle}}</span>
    </p>
  </div>
</template>

<script>
export default {
  name: 'ChartTitle',
  props: ['title', 'subTitle']
}
</script>

<style>
  .heading {
    font-size: 30px;
    margin-left: 50px;
    margin-top: 30px;
    color: black;
    border-bottom: 1px solid black;
  }
  .subtitle {
    font-size: 16px;
    margin-left: 20px;
    color: grey;
  }
</style>


