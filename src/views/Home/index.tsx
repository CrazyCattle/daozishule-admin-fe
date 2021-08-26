import { defineComponent, reactive } from 'vue'
import Table from '@/components/table'

export default defineComponent({
  props: {},
  emits: [],
  components: {},
  setup(props, ctx) {
    const data = reactive({
      tableData: {
        list: [
          {
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }
        ],
        columns: [
          {
            prop: 'date',
            label: '事件'
          },
          {
            prop: 'name',
            label: '姓名'
          },
          {
            prop: 'address',
            label: '地址'
          }
        ],
        options: {
          tableHeight: 500
        }
      }
    })
    return () => {
      return <Table tableData={data.tableData}></Table>
    }
  }
})
