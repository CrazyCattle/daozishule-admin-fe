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
    }
  },
  emits: ['closeDialog'],
  components: {},
  setup(props, ctx) {
    console.log(ctx, 'ctx');
    const { slots, emit } = ctx

    return () => {
      return (
        <ElDialog
          title="这是标题"
          model-value={props.visible}
          width={props.width}
          v-slots={{
            footer: () => {
              return (
                <span class="dialog-footer">
                  <ElButton
                    type="default"
                    onClick={() => {
                      emit('closeDialog', false)
                      // emit('update:visible', false)
                    }}
                  >
                    取消
                  </ElButton>
                  <ElButton type="primary">确 定</ElButton>
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
