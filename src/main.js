import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import Vant from 'vant'
import 'vant/lib/index.css'

// 全局样式文件
import './assets/reset.css'
import './styles/index.less'

// 动态设置REM基准值
import 'amfe-flexible'

// 处理时间格式
import '@/utils/dayjs'

Vue.use(Vant)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
