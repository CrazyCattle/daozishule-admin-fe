import { defineComponent, renderSlot, toRef } from 'vue'
import { ElDialog, ElButton } from 'element-plus'

export default defineComponent({
  props: {
    visible: {
      type: Boolean,
      default: false,
      required: true
    },
    width: {
      type: String
    },
    title: {
      type: String,
      default: '这是标题'
    }
  },
  emits: ['closeDialog', 'handleSumbit'],
  components: {},
  setup(props, ctx) {
    const { slots, emit } = ctx
    return () => {
      return (
        <ElDialog
          title={props.title}
          model-value={props.visible}
          width={props.width || '500px'}
          v-slots={{
            footer: () => {
              return (
                <span class="dialog-footer">
                  <ElButton
                    type="default"
                    onClick={() => {
                      emit('closeDialog')
                    }}
                  >
                    取消
                  </ElButton>
                  <ElButton
                    type="primary"
                    onClick={() => {
                      emit('handleSumbit')
                    }}
                  >
                    确 定
                  </ElButton>
                </span>
              )
            }
          }}
        >
          {renderSlot(slots, 'content')}
        </ElDialog>
      )
    }
  }
})
