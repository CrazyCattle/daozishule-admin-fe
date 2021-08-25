import { defineComponent, reactive } from 'vue'
import { ElTable, ElTableColumn } from 'element-plus'

export default defineComponent({
  props: {},
  emits: [],
  components: {},
  setup(props, ctx) {
    const data = reactive({
      tableData: new Array(30).fill({
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      })
    })
    return () => {
      return (
        <ElTable data={data.tableData} height="300">
          <ElTableColumn prop="date" label="日期" width="140"></ElTableColumn>
          <ElTableColumn prop="name" label="姓名" width="120"></ElTableColumn>
          <ElTableColumn prop="address" label="地址"></ElTableColumn>
        </ElTable>
      )
    }
  }
})
