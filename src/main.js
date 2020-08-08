import Vue from 'vue'
import App from './App.vue'
import VueP5 from 'vue-p5'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'

Vue.config.productionTip = false
Vue.use(VueMaterial)
Vue.use(VueP5)

new Vue({
  render: h => h(App),
}).$mount('#app')
