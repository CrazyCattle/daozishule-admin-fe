import { defineComponent, reactive } from 'vue'
import { ElTableColumn, ElButton } from 'element-plus'
import Table from '@/components/table'
import { getArticles } from '@/apis/index'
import { tableDataType } from '@/interfaces/table'

interface ReaciveProps {
  tableData: tableDataType;
}

export default defineComponent({
  props: {},
  emits: [],
  components: {},
  setup(props, ctx) {
    const data = reactive<ReaciveProps>({
      tableData: {
        list: [],
        columns: [],
        options: {
          tableHeight: 500
        }
      }
    })
    function handleDel(v: any, type: string) {
      console.log(v, type)
    }

    const getArticlesList = () => {
      getArticles({
        type: 'all'
      }).then((res) => {
        let columns = []
        columns.push(
          {
            prop: 'title',
            label: '标题'
          },
          {
            prop: 'createAt',
            label: '创建时间'
          }
        )
        data.tableData.list = [...res.data]
        data.tableData.columns = [...columns]
      })
    }
    getArticlesList()
    
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
                    align="center"
                    label="操作"
                    v-slots={{
                      default: (scope: any) => {
                        return (
                          <div>
                            <ElButton
                              type="primary"
                              size="small"
                              onClick={() => handleDel(scope.row, 'edit')}
                            >
                              编辑
                            </ElButton>
                            <ElButton
                              type="success"
                              size="small"
                              onClick={() => handleDel(scope.row, 'view')}
                            >
                              查看
                            </ElButton>
                            <ElButton
                              type="danger"
                              size="small"
                              onClick={() => handleDel(scope.row, 'del')}
                            >
                              删除
                            </ElButton>
                          </div>
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
})
