import { defineComponent, PropType, renderSlot } from 'vue'
import { ElTable, ElTableColumn } from 'element-plus'
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
        <ElTable data={tableData.list} height={tableData.options.tableHeight}>
          {tableData.columns.map((v: tableItemType) => {
            return <ElTableColumn align="left" prop={v.prop} label={v.label}></ElTableColumn>
          })}
          { slots.default?.() }
          {renderSlot(slots, 'default')}
          {/* <slot name="operation" text={'this is text'}></slot> */}
        </ElTable>
      )
    }
  }
})
