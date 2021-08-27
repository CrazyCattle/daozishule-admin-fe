import { defineComponent, reactive } from 'vue'
import { ElTableColumn, ElButton } from 'element-plus'
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
          },
          {
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }
        ],
        columns: [
          {
            prop: 'date',
            label: '事件',
            type: ''
          },
          {
            prop: 'name',
            label: '姓名',
            type: ''
          },
          {
            prop: 'address',
            label: '地址',
            type: ''
          },
          {
            prop: 'opera',
            label: '操作',
            type: 'slot',
            slot: 'test'
          }
        ],
        options: {
          tableHeight: 500
        }
      }
    })
    function handleDel(v: any) {
      console.log(v)
    }
    return () => {
      return (
        <div>
          <Table
            tableData={data.tableData}
            v-slots={{
              default: () => {
                return (
                  <ElTableColumn
                    fixed="right"
                    align="left"
                    label="操作"
                    v-slots={{
                      default: (scope: any) => {
                        return (
                          <ElButton type="primary" size="small" onClick={() => handleDel(scope)}>
                            删除
                          </ElButton>
                        )
                      }
                    }}
                  ></ElTableColumn>
                )
              }
            }}
          ></Table>
        </div>
      )
    }
  }

  // render() {
  //   return (
  //     <Table
  //       tableData={this.data.tableData}
  //       v-slots={{
  //         default: (props: any) => {
  //           return (
  //             <ElTableColumn fixed="right" align="left" label="操作">
  //               <ElButton type="primary" size="small" onClick={() => this.handleDel()}>
  //                 删除 {props}
  //               </ElButton>
  //             </ElTableColumn>
  //           )
  //         }
  //       }}
  //     ></Table>
  //   )
  // }
})
