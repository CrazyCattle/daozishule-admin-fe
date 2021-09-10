import { defineComponent, reactive, ref } from 'vue'
import {
  ElTableColumn,
  ElButton,
  ElSelect,
  ElOption,
  ElForm,
  ElFormItem,
  ElInput
} from 'element-plus'
import { tableDataType } from '@/interfaces/table'
import { getCategories, createCategory } from '@/apis/index'
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
interface addFormDataType {
  name: string
  url: string
}
interface ReaciveProps {
  tableData: tableDataType
  currentType: string
  type: string
  typeList: []
  visible: boolean
  addVisible: boolean
  rowData: ArticleType
  addFormData: addFormDataType
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
      },
      currentType: '',
      type: '',
      typeList: [],
      visible: false,
      addVisible: false,
      rowData: {
        title: '',
        author: '',
        describe: '',
        content: '',
        views: 0,
        thumbsUp: 0,
        categoray: [],
        createAt: ''
      },

      addFormData: {
        name: '',
        url: ''
      }
    })

    function handleDel(v: any, type: string): void {
      console.log(v, type)
      data.rowData = { ...v }
      if (type == 'del') {
        data.visible = true
      }
    }

    function handleCreateCategory(name: string, url: string) {
      createCategory({
        name,
        url
      }).then((res) => {
        const { status, statusText } = res
        if (status == 200 && statusText == 'OK') {
          data.addVisible = false
          getCategoriesFun()
        }
      })
    }

    function getCategoriesFun(): void {
      getCategories({}).then((res) => {
        let columns = [],
          list = res.data
        data.typeList = list
        columns.push(
          {
            prop: '_id',
            label: 'id'
          },
          {
            prop: 'name',
            label: '标签名称'
          },
          {
            prop: 'url',
            label: '标签链接'
          },
          {
            prop: 'createAt',
            label: '创建时间'
          }
        )
        data.tableData.columns = columns
        data.tableData.list = list
      })
    }
    getCategoriesFun()

    const dialog = (): JSX.Element => (
      <Dialog
        title="删除标签"
        visible={data.visible}
        onCloseDialog={() => {
          data.visible = !data.visible
        }}
        onHandleSumbit={() => {
          console.log('onHandleSumbit')
        }}
        v-slots={{
          content: () => {
            return <div>这里是默认内容</div>
          }
        }}
      ></Dialog>
    )

    const addFormRef = ref<typeof ElForm | null>(null)
    const addDialog = (): JSX.Element => (
      <Dialog
        title="新增标签"
        width="600px"
        visible={data.addVisible}
        onCloseDialog={() => {
          data.addVisible = false
        }}
        onHandleSumbit={() => {
          if (!addFormRef.value) return
          addFormRef.value.validate((v: boolean) => {
            if (v) {
              handleCreateCategory(data.addFormData.name, data.addFormData.url)
            } else {
              return
            }
          })
        }}
        v-slots={{
          content: () => {
            return (
              <div class="flex justify-center items-center">
                <ElForm ref={addFormRef} model={data.addFormData}>
                  <ElFormItem
                    prop="name"
                    rules={[{ required: true, message: '请输入标签名称' }]}
                    label="标签名称:"
                  >
                    <ElInput
                      v-model={data.addFormData.name}
                      style="width: 300px;"
                      placeholder="请输入标签名称"
                    ></ElInput>
                  </ElFormItem>
                  <ElFormItem
                    prop="url"
                    rules={[{ required: true, message: '请输入标签链接' }]}
                    label="标签链接:"
                  >
                    <ElInput v-model={data.addFormData.url} placeholder="请输入标签链接"></ElInput>
                  </ElFormItem>
                </ElForm>
              </div>
            )
          }
        }}
      ></Dialog>
    )

    const btnGroup = (v: any): JSX.Element => (
      <>
        <ElButton type="primary" size="small" onClick={() => handleDel(v, 'edit')}>
          编辑
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
                filterable
                placeholder="请选择标签"
                v-model={data.type}
                onChange={(v) => {
                  data.currentType = v
                  getCategoriesFun()
                }}
              >
                {data.typeList.map((v: categoriesType) => {
                  return <ElOption label={v.name} value={v._id}></ElOption>
                })}
              </ElSelect>
            </div>
            <ElButton
              onClick={() => {
                data.addVisible = true
              }}
              type="primary"
              size="small"
            >
              新增标签
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
          {addDialog()}
        </div>
      )
    }
  }
})
