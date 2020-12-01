import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.config.productionTip = false

Vue.use(ElementUI)

// 引入全局过滤器
import * as filters from './filters'
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})
// 引入全局指令
import '@/directives/elDragDialog'

// 引入全局组件
import plugins from './components/index'
Vue.use(plugins)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
