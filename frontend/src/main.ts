import { createApp } from 'vue'
import App from './App.vue'
import './assets/base.less'
import { createPinia } from 'pinia'
import { useMarkerType } from '@/stores/markerType'

const app = createApp(App)
app.use(createPinia())
app.mount('#app')
