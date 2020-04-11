<template>
  <div id="app">
    <CanvasSelect v-if="canvasSelectVisible" />
    <Paint />
  </div>
</template>

<script>
import CanvasSelect from './components/CanvasSelect.vue'
import Paint from './components/Paint.vue'

export default {
  name: 'App',
  components: {
    CanvasSelect,
    Paint
  },
  data() {
    return { 
      canvasSelectVisible: false
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  padding-top: 60px;
}

body {
  overflow: hidden;
  background: burlywood;
  margin: 0;
}
</style>
