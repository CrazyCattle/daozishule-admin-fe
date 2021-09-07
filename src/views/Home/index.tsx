import { defineComponent, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { ElTableColumn, ElButton, ElSelect, ElOption } from 'element-plus'
import { tableDataType } from '@/interfaces/table'
import { getArticles, getCategories, delArticle } from '@/apis/index'
import Table from '@/components/table'
import Dialog from '@/components/dialog'
import { ArticleType } from '@/interfaces/interface-tags'
interface categoriesType {
  _id: string
  __v: number
  name: string
  url: string
  createAt: string
}
interface ReaciveProps {
  tableData: tableDataType
  currentType: string
  type: string
  typeList: []
  visible: boolean
  rowData: ArticleType
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
      currentType: '',
      type: '',
      typeList: [],
      visible: false,
      rowData: {
        title: '',
        author: '',
        describe: '',
        content: '',
        views: 0,
        thumbsUp: 0,
        categoray: [],
        createAt: ''
      }
    })

    function handleDel(v: any, type: string): void {
      console.log(v, type)
      data.rowData = { ...v }
      if (type == 'del') {
        data.visible = true
      }
    }

    function handleAdd(): void {
      console.log(router)
      router.push({
        path: '/AddArticle'
      })
    }

    function handleDelArticle() {
      delArticle({
        id: data.rowData._id
      }).then(res => {
        if (res.status == 204) {
          data.visible = false
          getArticlesList()
        }
      })
    }

    function getCategoriesFun(): void {
      getCategories({}).then((res) => {
        data.typeList = res.data
      })
    }
    getCategoriesFun()

    function getArticlesList(): void {
      getArticles({
        type: data.currentType || 'all'
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

    const dialog = (): JSX.Element => (
      <Dialog
        visible={data.visible}
        onCloseDialog={() => {
          data.visible = !data.visible
        }}
        onHandleSumbit={() => {
          handleDelArticle()
        }}
        v-slots={{
          content: () => {
            return <div>这里是默认内容</div>
          }
        }}
      ></Dialog>
    )

    const btnGroup = (v: any): JSX.Element => (
      <>
        <ElButton type="primary" size="small" onClick={() => handleDel(v, 'edit')}>
          编辑
        </ElButton>
        <ElButton type="success" size="small" onClick={() => handleDel(v, 'view')}>
          查看
        </ElButton>
        <ElButton type="danger" size="small" onClick={() => handleDel(v, 'del')}>
          删除
        </ElButton>
      </>
    )

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
                  data.currentType = v
                  getArticlesList()
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
                        return btnGroup(scope.row)
                      }
                    }}
                  ></ElTableColumn>
                )
              }
            }}
          ></Table>

          {dialog()}
        </div>
      )
    }
  }
})
