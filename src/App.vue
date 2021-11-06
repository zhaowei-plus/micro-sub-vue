<template>
  <div class="app">
    <router-link :to="'home'">Home</router-link>
    <router-link :to="'about'">about</router-link>
    <router-view></router-view>
    <div id="vue"></div> <!-- vue子项目挂载点 -->
    <div id="react"></div> <!-- react子项目挂载点 -->
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
