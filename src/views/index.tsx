import { defineComponent } from 'vue'
import CommonPage from '@/components/common'
export default defineComponent({
  props: {},
  emits: [],
  components: { CommonPage },
  setup(props, ctx) {
    return () => {
      return <common-page></common-page>
    }
  }
})
