import { defineComponent, reactive } from 'vue'
import { ElTableColumn, ElButton, ElSelect, ElOption } from 'element-plus'
import Table from '@/components/table'
import { getArticles, getCategories } from '@/apis/index'
import { tableDataType } from '@/interfaces/table'
import { useRouter } from 'vue-router'

interface categoriesType {
  _id: string
  __v: number
  name: string
  url: string
  createAt: string
}
interface ReaciveProps {
  tableData: tableDataType
  type: string
  typeList: []
}

export default defineComponent({
  props: {},
  emits: [],
  components: {},
  setup(props, ctx) {
    const router = useRouter()
    const data = reactive<ReaciveProps>({
      tableData: {
        list: [],
        columns: [],
        options: {
          tableHeight: 500
        }
      },
      type: '',
      typeList: []
    })

    function handleDel(v: any, type: string): void {
      console.log(v, type)
    }

    function handleAdd(): void {
      console.log(router)
      router.push({
        path: '/AddArticle'
      })
    }

    function getCategoriesFun(): void {
      getCategories({}).then((res) => {
        data.typeList = res.data
      })
    }
    getCategoriesFun()

    function getArticlesList(type: string): void {
      getArticles({
        type
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
    getArticlesList('all')

    return () => {
      return (
        <div>
          <div class="flex justify-between p-2 bg-white border-b-2">
            <div class="flex">
              <ElSelect
                size="small"
                clearable
                placeholder="请选择文章所属类别"
                v-model={data.type}
                onChange={(v) => {
                  getArticlesList(v || 'all')
                }}
              >
                {data.typeList.map((v: categoriesType) => {
                  return <ElOption label={v.name} value={v._id}></ElOption>
                })}
              </ElSelect>
            </div>
            <ElButton
              onClick={() => {
                handleAdd()
              }}
              type="primary"
              size="small"
            >
              新增文章
            </ElButton>
          </div>
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
