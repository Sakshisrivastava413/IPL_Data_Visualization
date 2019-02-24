<template>
  <div>
    <p class="heading">{{ title }}</p>
  </div>
</template>

<script>
export default {
  name: 'ChartTitle',
  props: ['title']
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
</style>


