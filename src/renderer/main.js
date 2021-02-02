import Vue from 'vue'

import App from './App'
import router from './router'
import store from './store'
import request from './request/http'

// 引入element-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 引入echarts
import * as echarts from 'echarts'
// 引入数据库
import db from './datastore/datastore'
if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.prototype.$request = request
Vue.prototype.$echarts = echarts
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.prototype.$db = db
/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
