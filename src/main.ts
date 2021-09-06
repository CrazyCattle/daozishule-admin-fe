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

const app = createApp(App)
app.use(router).use(VMdPreview).use(VMdEditor).mount('#app')
