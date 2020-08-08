<template>
  <div id="app">
    <div v-if="createNewFolder">
      <div class="new-folder">
      </div>
      <div class="new-folder-modal">
        <md-card>
          <md-card-content>
            <md-field>
              <label>Input Folder Name</label>
              <md-input v-model="inputFolderName"/>
            </md-field>
          </md-card-content>
          <p class="error-text" v-if="folderNameError">Folder name already taken</p>
          <p class="error-text" v-if="folderError">There was an error in folder creation</p>
          <md-card-actions>
            <md-button @click="createNewFolder = false; inputFolderName = ''; folderError = folderNameError = false; enableScroll()">Cancel</md-button>
            <md-button @click="newFolder()">Create</md-button>
          </md-card-actions>
        </md-card>
      </div>
    </div>
    <div v-if="selectCanvasVisible">
      <div class="canvas-select-background"></div>
      <div class="select-canvas-modal">
        <md-card>
          <md-field>
            <div class="file-list">
              <md-button class="md-primary md-raised" v-for="file in canvases" :key="file" @click="selectCanvas(file)"> 
                {{ file }} 
              </md-button>
            </div>
          </md-field>
          <md-card>
            <h3 id="file-input-header">Enter New Canvas Name</h3>
            <input v-model="inputCanvasName">
            <md-field>
              <md-button class="md-primary md-raised" @click="addFile()">Add</md-button>
            </md-field>
          </md-card>
          <md-card-actions>
            <md-button @click="selectCanvasVisible = false; enableScroll()">Cancel</md-button>
          </md-card-actions>
        </md-card>
      </div>
    </div>
    <div class="folder-select" v-if="folderSelectVisible">
      <button class="folder-select-button new-folder-button" @click="createNewFolder = true; disableScroll()">
        <p class="inner-text">New Folder</p>
      </button>
      <button class="folder-select-button select-folder-button" v-for="folder in folders" :key="folder" @click="getFileNames(folder)">
        <p class="inner-text">{{ folder }}</p>
      </button>
    </div>
    <div id="back-button">
      <md-button class="md-raised md-primary" v-if="!folderSelectVisible" @click="folderSelectVisible = true">Back</md-button>
    </div>
    <Paint v-if="!folderSelectVisible" :canvasName="selectedCanvas" :folderName="selectedFolder"/>
  </div>
</template>

<script>
import Paint from './components/Paint.vue'
import axios from 'axios'

export default {
  name: 'App',
  components: {
    Paint
  },
  data() {
    return { 
      folderSelectVisible: true,
      createNewFolder: false,
      selectedCanvas: '',
      selectedFolder: '',
      folders: [],
      folderError: false,
      folderNameError: false,
      inputFolderName: '',
      inputCanvasName: '',
      selectCanvasVisible: false,
      canvases: [],
    }
  },
  created () {
    // testing db
    axios.get('/foo').then(response => {
      if(!response) {
        throw new Error('There is no communication with the server!')
      }
    })
    axios.post('/bar', {test: 'test-value'}).then(response => {
      if(!response && !response.data.test) {
        throw new Error('Test value was not returned from server')
      }
    })

    this.getFolderNames()
  },
  methods: {
    selectCanvas(canvas) {
      this.selectedCanvas = canvas
      this.enableScroll()
      this.folderSelectVisible = false
      this.selectCanvasVisible = false
    },
    newFolder() {
      axios.post('/new-folder', { folderName: this.inputFolderName }).then(response => {
        if(response.data === 'okay') {
          this.inputFolderName = ''
          this.createNewFolder = false
          this.folderError = false
          this.folderNameError = false
          this.enableScroll()
          this.getFolderNames()
        }
        else if(response.data === 'already exists'){
          this.folderNameError = true
        }
        else {
          this.folderError = true
        }
      })
    },
    getFolderNames() {
      axios.get('/get-folders').then(response => {
        this.folders = response.data.folderNames
      })
    },
    getFileNames(folderName) {
      axios.post('/files-from-folder', { folderName: folderName }).then(response => {
        this.selectCanvasVisible = true
        this.disableScroll()
        this.canvases = response.data.fileNames.map(x => x.split('.')[0])
        this.selectedFolder = folderName
      })
    },
    addFile () {
      axios.post('/new-canvas', {
        canvasName: this.inputCanvasName,
        folderName: this.selectedFolder
      }).then(() => {
        this.selectedCanvas = this.inputCanvasName
        this.enableScroll()
        this.folderSelectVisible = false
        this.selectCanvasVisible = false
        this.inputCanvasName = ''
      })
    },
    disableScroll() {
      document.body.style.overflowX = 'hidden'
    },
    enableScroll() {
      document.body.style.overflowX = ''
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.folder-select-button {
  width: 350px;
  height: 350px;
  background: white;
  position: relative;
  top: 225px;
  box-shadow: 7px 7px 5px black;
  margin-right: 40px;
}
.folder-select {
  left: 100px;
  position: absolute;
  display: inline-flex;
  background: rgb(174, 238, 217);
  height: 100%;
}
.new-folder-button {
  background-image: url("./assets/plus-sign.png");
  background-repeat: no-repeat;
  background-size: 100%;
}
.select-folder-button {
  background-image: url("./assets/folder.png");
  background-repeat: no-repeat;
  background-size: 70%;
  background-position: center;
}
.inner-text {
  position: absolute;
  padding-top: 100px;
  left: 34%;
  font-size: 20px;
}
.new-folder {
  background-color: black;
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 1;
  opacity: 0.75;
}
.new-folder-modal {
  z-index: 2;
  opacity: 1;
  position: absolute;
  top: 33%;
  left: 44%;
}
.error-text {
  color: red;
  padding-left: 10px;
}
.canvas-select-background {
  background-color: black;
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 1;
  opacity: 0.75;
}
.select-canvas-modal {
  z-index: 2;
  opacity: 1;
  position: absolute;
  top: 15%;
  left: 15%;
  width: 70%;
}
.file-list {
  padding: 20px;
}
#back-button {
  position: aboslute;
}
#file-input-header {
  padding-left: 5px;
}
body {
  overflow-y: hidden;
  background: rgb(174, 238, 217);
  margin: 0;
}
</style>
