import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import VueLazyload from 'vue-lazyload'
import _ from 'lodash'

Vue.prototype._ = _

Vue.use(VueLazyload, {
  preLoad: 1.3,

  adapter: {
    loaded ({ bindType, el, naturalHeight, naturalWidth, $parent, src, loading, error, Init }) {
      // do something here
      // example for call LoadedHandler
      // if (el.width <= el.height) {
      //   console.log('height bigger')
      //   el.style.maxWidth = '100%'
      //   el.style.top = -(el.height - el.width) / 2 + 'px'
      // } else {
      //   console.log('width bigger')
      //   el.style.maxHeight = '100%'
      //   el.style.left = -(el.width - el.height) / 2 + 'px'
      // }
    }
  }

})
Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
