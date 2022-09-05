import { createApp } from 'vue'
import App from './App.vue'
import './assets/base.less'
import { createPinia } from 'pinia'
import { useMarkerType } from '@/stores/markerType'
import 'element-plus/theme-chalk/el-loading.css'
import 'element-plus/theme-chalk/el-message.css'
import 'element-plus/theme-chalk/el-notification.css'
import 'element-plus/theme-chalk/el-message-box.css'

const app = createApp(App)
app.use(createPinia())
app.mount('#app')
