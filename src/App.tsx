import { defineComponent, reactive } from 'vue'
import { RouterView, useRouter } from 'vue-router'
import { ElLoading } from 'element-plus'
import CommonPage from '@/components/common'
import '@/assets/less/common.less'

export default defineComponent({
  props: {},
  emits: [],
  components: { CommonPage },
  setup() {
    const data = reactive({
      isLogin: true,
    })
    
    const router = useRouter()
    const token = window.sessionStorage.getItem('TOKEN')
    const _id = window.sessionStorage.getItem('_id')
    if (!token && !_id) {
      router.replace('/Login')
    }
    
    return () => <RouterView  />
  }
})
