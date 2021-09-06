import { defineComponent, reactive, ref } from 'vue'
import {
  ElButton,
  ElForm,
  ElFormItem,
  ElInput,
  ElSelect,
  ElOption,
  ElMessage,
  ElLoading
} from 'element-plus'
import { useRouter } from 'vue-router'
import { createArticle, getCategories } from '@/apis/index'
interface categoriesType {
  _id: string
  __v: number
  name: string
  url: string
  createAt: string
}

export default defineComponent({
  props: {},
  emits: [],
  components: {},
  setup() {
    const data = reactive({
      formData: {
        title: '',
        desc: '',
        typeList: [],
        content: ''
      },
      categroies: [],
      fullscreenLoading: false
    })

    const formRef = ref<typeof ElForm | null>(null)
    const router = useRouter()

    function getCategoriesFun(): void {
      getCategories({}).then((res) => {
        data.categroies = res.data
      })
    }
    getCategoriesFun()

    function createArticleFun() {
      createArticle({
        title: data.formData.title,
        describe: data.formData.desc,
        content: data.formData.content,
        categoray: JSON.stringify(data.formData.typeList)
      }).then((res) => {
        if (res.status == 200 && res.statusText == 'OK') {
          ElMessage.success('提交通过！')
          router.replace({
            path: '/Articles'
          })
        } else {
          ElMessage.success(res.statusText)
        }
      })
    }

    const handleSubmit = (): void => {
      if (!formRef.value) return
      formRef.value.validate((v: boolean) => {
        if (v) {
          createArticleFun()
        } else {
          return
        }
      })
    }
    function handleBack(): void {
      router.replace({
        path: '/Articles'
      })
    }

    function importFile(event: Event): void {
      const eventTarget = event.target as HTMLInputElement
      if (eventTarget.files) {
        const file = eventTarget.files[0]
        const reader = new FileReader()
        reader.readAsText(file)
        reader.onload = function () {
          console.log(this.result)
        }
      }
    }

    return () => {
      return (
        <div class="bg-white h-screen">
          <ElForm class=" pt-6" ref={formRef} model={data.formData}>
            <div class=" flex justify-between pl-5 pr-2 border-b-2">
              <div class="flex">
                <ElFormItem
                  label="文章标题:"
                  class=" w-auto mr-5"
                  prop="title"
                  rules={[
                    {
                      required: true,
                      message: '请输入文章标题'
                    }
                  ]}
                >
                  <ElInput
                    v-model_trim={data.formData.title}
                    placeholder="请输入文章标题"
                  ></ElInput>
                </ElFormItem>
                <ElFormItem
                  label="文章所属类别:"
                  class=" w-auto mr-5"
                  prop="typeList"
                  rules={[
                    {
                      required: true,
                      message: '请选择文章所属类别'
                    }
                  ]}
                >
                  <ElSelect
                    class=" w-full"
                    v-model={data.formData.typeList}
                    placeholder="请选择文章所属类别"
                    clearable
                    multiple
                    collapseTags
                  >
                    {data.categroies.map((v: categoriesType) => {
                      return <ElOption label={v.name} value={v._id}></ElOption>
                    })}
                  </ElSelect>
                </ElFormItem>
                <ElFormItem
                  label="文章描述:"
                  class=" w-auto"
                  prop="desc"
                  rules={[
                    {
                      required: true,
                      message: '请输入文章描述'
                    }
                  ]}
                >
                  <ElInput v-model_trim={data.formData.desc} placeholder="请输入文章描述"></ElInput>
                </ElFormItem>
              </div>
              <div>
                <ElButton type="warning">上传封面图</ElButton>
                <ElButton
                  type="danger"
                  onClick={() => {
                    handleBack()
                  }}
                >
                  返回
                </ElButton>
                <ElButton
                  onClick={() => {
                    handleSubmit()
                  }}
                  type="primary"
                >
                  提交
                </ElButton>
              </div>
            </div>
            <ElFormItem
              label=""
              prop="content"
              rules={[
                {
                  required: true,
                  message: '请输入文章内容'
                }
              ]}
            >
              <v-md-editor
                width="100%"
                height="calc(100vh - 88px)"
                v-model_trim={data.formData.content}
              ></v-md-editor>
            </ElFormItem>
          </ElForm>
        </div>
      )
    }
  }
})
