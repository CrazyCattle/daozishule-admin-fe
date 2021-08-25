import { createApp } from 'vue'
import 'element-plus/dist/index.css'
import router from '@/router/index'
import './main.less'
import App from './App'

const app = createApp(App)
app.use(router)
app.mount('#app')
