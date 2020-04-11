<template>
  <div>
    <md-button @click="showFolder">THIS IS A TEST</md-button>
    <KappaFolderView v-if="!folderViewHidden"/>
  </div>
</template>

<script>
import KappaFolderView from './KappaFolderView'

export default {
    name: 'CanvasSelect',
    components: {
        KappaFolderView
    },
    data: () => ({
        
    }),
    methods: {
        showFolder() {
            this.folderViewHidden = false
        },

    }
}
</script>

<style>

</style>