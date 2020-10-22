import Vue from 'vue'
import App from './App.vue'
import http from './utils/http'
import * as url from './utils/url'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.prototype.$http = http
Vue.prototype.$url = url
Vue.config.productionTip = false
Vue.use(ElementUI)
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
