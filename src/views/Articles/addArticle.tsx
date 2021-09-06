import { defineComponent, reactive, ref } from 'vue'
import { ElButton, ElForm, ElFormItem, ElInput, ElSelect, ElOption, ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'

export default defineComponent({
  props: {},
  emits: [],
  components: {},
  setup() {
    const data = reactive({
      formData: {
        title: '',
        desc: '',
        type: '',
        content: ''
      }
    })

    const formRef = ref<typeof ElForm | null>(null)
    const router = useRouter()

    function handleSubmit(): void {
      if (!formRef.value) return
      formRef.value.validate((v: boolean) => {
        if (v) {
          console.log(data.formData)
          ElMessage.success('验证通过！')
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
                  prop="type"
                  rules={[
                    {
                      required: true,
                      message: '请选择文章所属类别'
                    }
                  ]}
                >
                  <ElSelect
                    class=" w-full"
                    v-model={data.formData.type}
                    placeholder="请选择文章所属类别"
                    clearable
                  >
                    <ElOption label="Vue" value="60b5af3a6a4b1eccb19183cd"></ElOption>
                    <ElOption label="React" value="60b5af426a4b1eccb19183ce"></ElOption>
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
