// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import MapLoader from './components/MapLoader'

Vue.config.productionTip = false
Vue.component('my-map', MapLoader)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  // template: '<App/>',
  components: { App }
})
