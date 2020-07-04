import Vue from 'vue'
import WebFont from 'webfontloader'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

WebFont.load({
  google: {
    families: ['IBM Plex Sans:400,600:latin,cyrillic']
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
