import { defineComponent, PropType, renderSlot } from 'vue'
import { ElTable, ElTableColumn, ElEmpty } from 'element-plus'
import { tableDataType, tableItemType } from '@/interfaces/table'

export default defineComponent({
  props: {
    tableData: {
      type: Object as PropType<tableDataType>,
      required: true
    }
  },
  emits: [],
  components: {},
  setup(props, ctx) {
    const { tableData } = props
    const { slots } = ctx

    return () => {
      return (
        <ElTable
          data={tableData.list}
          height={tableData.options.tableHeight}
          v-slots={{
            empty: () => {
              return <ElEmpty description="暂无数据"></ElEmpty>
            }
          }}
        >
          {tableData.columns.map((v: tableItemType) => {
            return <ElTableColumn align="center" prop={v.prop} label={v.label}></ElTableColumn>
          })}
          {slots.default?.()}
          {/* {renderSlot(slots, 'default')} */}
          {/* <slot name="operation" text={'this is text'}></slot> */}
        </ElTable>
      )
    }
  }
})
