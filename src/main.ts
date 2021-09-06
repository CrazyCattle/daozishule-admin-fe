import { createApp } from 'vue'
import { ElLoading } from 'element-plus'
import 'element-plus/dist/index.css'
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import router from '@/router/index'
import './main.less'
import App from './App'

import VMdEditor from '@kangc/v-md-editor'
import VMdPreview from '@kangc/v-md-editor/lib/preview'
import '@kangc/v-md-editor/lib/style/base-editor.css'
import '@kangc/v-md-editor/lib/style/preview.css'
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js'
import '@kangc/v-md-editor/lib/theme/style/vuepress.css'
import Prism from 'prismjs'
import 'prismjs/components/prism-json'
VMdPreview.use(vuepressTheme, { Prism })
VMdEditor.use(vuepressTheme, { Prism })

const token = window.sessionStorage.getItem('TOKEN')
const _id = window.sessionStorage.getItem('_id')
if (token && _id) {
  axios.defaults.headers['authorization'] = `Bearer ${token}`
  axios.defaults.headers['_id'] = _id
}

let loading: any
axios.interceptors.request.use((config: AxiosRequestConfig) => {
  loading = ElLoading.service({
    lock: true,
    text: '数据加载中...',
    spinner: 'el-icon-loading',
    background: 'rgba(0, 0, 0, 0.7)'
  })
  return config
})
axios.interceptors.response.use((respon: AxiosResponse) => {
  loading.close()
  return respon
})

const app = createApp(App)
app.use(router).use(VMdPreview).use(VMdEditor).mount('#app')
