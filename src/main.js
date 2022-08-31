import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import  getVant from '@/plugins/index'

const app = createApp(App)
// 使用插件
getVant(app)
app.use(store)
app.use(router).mount('#app')

