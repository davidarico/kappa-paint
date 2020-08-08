<template>
  <div class="outline">
    <div id='canvas-name'>
        <input type="text" v-model="canvasName">
        <md-button class="md-raised md-primary" @click="saveCanvas()">Save</md-button>
    </div>
    <div class="tools">
        <div class="indv-tool" v-for="tool in tools" :key="tool">
            <button @click="selected = tool">
                {{ tool }}
            </button>
        </div>
    </div>
    <div class="color">
        <md-card>
            <md-field>
                <label>Line Thickness</label>
                <md-input v-model="thickness"></md-input>
            </md-field>
        </md-card>
    </div>
    <div class="thickness">
        <md-card>
            <md-field>
                <label>Color</label>
                <md-input v-model="color"></md-input>
            </md-field>
        </md-card>
    </div>
    <div class="canvas">
      <vue-p5 
        class="canvas"
        @setup="setup"
        @mousedragged="mouseDragged"
        @draw="draw"
      >
      </vue-p5>
    </div>
  </div>
</template>

<script>
import VueP5 from 'vue-p5'
import axios from 'axios'

export default {
    name: 'Paint',
    components: {
        'vue-p5': VueP5
    },
    props: {
        canvasName: String,
        folderName: String
    },
    data: () => ({
        lines: [],
        color: '#000000',
        thickness: 6,
        tools: [
            'freehand',
            'lasso',
            'rectangle',
            'dropper',
            'marker',
            'erase',
            'text',
            'search'
        ],
        selected: 'freehand',
        oldCanvasName: '',
        settingsModalOpen: false,
        savedSketch: {}
    }),
    watch: {

    },
    created () {
        this.oldCanvasName = this.canvasName
    },
    methods: {
        draw(sketch) {
            this.savedSketch = sketch
            if (this[this.selected]) {
                this[this.selected](sketch)
            }
            else {
                throw new Error(`cannont get selected tool ${this.selected}`)
            }
        },
        freehand (sketch) {
            for (let line of this.lines) {
                sketch.stroke(line.color)
                sketch.strokeWeight(line.thickness)
                sketch.line(line.pmouseX, line.pmouseY, line.mouseX, line.mouseY)
            }
        },
        lasso (sketch) {
            console.log(sketch)
            return
        },
        rectangle (sketch) {
            console.log(sketch)
            return
        },
        dropper (sketch) {
            console.log(sketch)
            return
        },
        marker (sketch) {
            console.log(sketch)
            return
        },
        erase (sketch) {
            for (let line of this.lines) {
                sketch.stroke(line.color)
                sketch.strokeWeight(line.thickness)
                sketch.line(line.pmouseX, line.pmouseY, line.mouseX, line.mouseY)
            }
        },
        text (sketch) {
            console.log(sketch)
            return
        },
        colors (sketch) {
            console.log(sketch)
            return
        },
        search (sketch) {
            console.log(sketch)
            return
        },
        setup(sketch) {
            sketch.createCanvas(1700, 800)
            sketch.background('white');

            axios.post('/get-canvas', {
                canvasName: this.canvasName,
                folderName: this.folderName
            }).then(response => {
                let d = response.data

                // DRAWING LINES
                this.lines = d.lines || []
                for (let line of d.lines) {
                    sketch.stroke(line.color)
                    sketch.strokeWeight(line.thickness)
                    sketch.line(line.pmouseX, line.pmouseY, line.mouseX, line.mouseY)
                }
            })
        },
        addline(line) {
            this.lines.push(line)
            ///this.lines = this.lines.slice(-100)
        },
        mouseDragged({ mouseX, mouseY, pmouseX, pmouseY }) {
            this.addline({ mouseX, mouseY, pmouseX, pmouseY, color: this.selected === 'freehand' ? this.color : '#FFFFFF', thickness: this.thickness});
        },
        saveCanvas () {
            console.log(this.savedSketch.toString())
            axios.post('/update-canvas-name', {
                folderName: this.folderName,
                canvasName: this.canvasName,
                oldCanvasName: this.oldCanvasName
            }).then(() => {
                this.oldCanvasName = this.canvasName

                axios.post('/save-canvas', {
                    canvasName: this.canvasName,
                    folderName: this.folderName,
                    canvasData: {
                        lines: this.lines
                    }
                }).then(response => {
                    if(response.data != 'ok') {
                        throw new Error('Server didnt respond with success')
                    }
                })
            })
        }
    },
    render(h) {
        return h(VueP5, {on: this})
    }
}
</script>

<style>
.indv-tool {
    height: 55px;
}
.indv-tool:first-child {
    margin-top: 20px;
}
.tools {
    margin: auto;
    top: 200px;
    background-color: white;
    height: 500px;
    position: absolute;
    width: 70px;
    left: 20px;
    box-shadow: 3px 3px 4px gray;
}
.canvas {
    margin: auto;
    width: 1700px;
    height: 800px;
    box-shadow: 3px 3px 4px gray;
}
.outline {
    text-align: center;
}
#canvas-name {
    padding-bottom: 5px;
}
.color {
    top: 15px;
    position: absolute;
    left: 1601px;
}
.thickness {
    top: 15px;
    position: absolute;
    left: 1384px;
}
input {
    margin: 6px;
    font-size: x-large;
}
</style>