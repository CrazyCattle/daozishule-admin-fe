import { defineComponent, PropType } from 'vue'
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
    return () => {
      return (
        <ElTable data={tableData.list} height={tableData.options.tableHeight}>
          {tableData.columns.map((v: tableItemType) => {
            return <ElTableColumn align="center" prop={v.prop} label={v.label}></ElTableColumn>
          })}
        </ElTable>
      )
    }
  }
})
