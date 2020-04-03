<template>
  <div id="app">
    <CanvasSelect />
  </div>
</template>

<script>
import CanvasSelect from './components/CanvasSelect.vue'

export default {
  name: 'App',
  components: {
    CanvasSelect
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
