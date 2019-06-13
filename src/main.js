import Vue from 'vue'
import App from './App'

import net from '@/utils/net'
import api from '@/utils/api'

Vue.prototype.$net = net
Vue.prototype.$api = api

Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue(App)
app.$mount()