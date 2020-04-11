<template>
  <div class="canvas">
    <vue-p5 
      class="canvas"
      @setup="setup"
      @mousedragged="mouseDragged"
      @draw="draw"
    >
    </vue-p5>
  </div>
</template>

<script>
import VueP5 from 'vue-p5'

export default {
    name: 'Paint',
    components: {
        'vue-p5': VueP5
    },
    data: () => ({
        lines: [],
        red: 0,
        green: 0,
        blue: 0
    }),
    methods: {
        draw(sketch) {
            for (let line of this.lines) {
                sketch.stroke(line.color);
                sketch.line(line.pmouseX, line.pmouseY, line.mouseX, line.mouseY);
            }
        },
        setup(sketch) {
            sketch.createCanvas(1700, 800)
            sketch.background('white');
        },
        addline(line) {
            this.lines.push(line)
            this.lines = this.lines.slice(-100)
        },
        mouseDragged({ mouseX, mouseY, pmouseX, pmouseY }) {
            this.addline({ mouseX, mouseY, pmouseX, pmouseY, color: 255 });
        }
    },
    render(h) {
        return h(VueP5, {on: this})
    }
}
</script>

<style>
.canvas {
    margin: auto;
    width: 1700px;
    height: 800px;
    box-shadow: 7px 7px 5px black;
}
</style>