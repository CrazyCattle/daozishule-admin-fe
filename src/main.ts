import { createApp } from 'vue'
import 'element-plus/dist/index.css'
import axios from 'axios'
import router from '@/router/index'
import './main.less'
import App from './App'

const token = window.sessionStorage.getItem('TOKEN')
const _id = window.sessionStorage.getItem('_id')
if (token && _id) {
  axios.defaults.headers['authorization'] = `Bearer ${token}`
  axios.defaults.headers['_id'] = _id
}

const app = createApp(App)
app.use(router)
app.mount('#app')
