import Vue from 'vue'
import App from './App.vue'
import router from './routers'
import axios from 'axios'
import store from './Store/index'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI)

Vue.prototype.axios = axios
Vue.config.productionTip = false

import Bscroll from '@/components/Bscroll'
//注册全局组件 Bscrool
Vue.component('Bscroll', Bscroll)

import Loading from '@/components/Loading'
//注册全局组件Loading
Vue.component('Loading', Loading)

//定义全局过滤器 过滤图片格式
Vue.filter('setWH', (url, arg) => {
    return url.replace(/w\.h/, arg)
})


new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')