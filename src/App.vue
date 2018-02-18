<template>
  <div id="app">
    <img src="./assets/logo.png">
    <bkkUpcoming/>
  </div>
</template>

<script>
import bkkUpcoming from '@/components/bkkUpcoming';

export default {
  name: 'App',
  components: { bkkUpcoming },
  data() {
    return {
      kekitto: { time: 999, route: 99 },
    };
  },
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
