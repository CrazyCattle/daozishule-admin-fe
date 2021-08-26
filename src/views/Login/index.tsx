import { defineComponent, reactive, ref } from 'vue'
import { ElForm, ElFormItem, ElInput, ElButton, ElMessage } from 'element-plus'
import { login } from '@/apis/index'
import LOGIN_BG from '@/assets/images/login-bg.png'
export default defineComponent({
  components: {},
  setup(props, ctx) {
    const data = reactive({
      formData: {
        username: '',
        password: ''
      }
    })
    const Login = async () => {
      const respon = await login({
        name: data.formData.username,
        password: data.formData.password
      })
      console.log(respon, 'respon');
      const { status, message, statusTip } = respon.data
      if (status && status == 1) {
        ElMessage.success(statusTip);
        window.sessionStorage.setItem('TOKEN', respon.data.token)
        window.sessionStorage.setItem('_id', respon.data._id)
        window.location.href = '/'
      } else {
        ElMessage.error(message);
      }
    }
    const loginFormRef = ref<typeof ElForm | null>(null)
    const handleSubmit = () => {
      if (!loginFormRef.value) return
      loginFormRef.value.validate((v: boolean) => {
        if (v) {
          Login()
        } else {
          return
        }
      })
    }

    return () => {
      return (
        <div
          class=" h-screen flex items-center justify-center"
          style={{ backgroundImage: `url(${LOGIN_BG})` }}
        >
          <ElForm
            model={data.formData}
            ref={loginFormRef}
            class=" w-72 box-content pl-10 pr-10 pb-5 pt-10 rounded-md"
          >
            <ElFormItem
              prop="username"
              rules={[{ required: true, message: '请输入账号', trigger: ['blur', 'change'] }]}
            >
              <ElInput
                v-slots={{
                  prefix: () => (
                    <div class="pl-1">
                      <i style="font-size: 16px;" class="el-icon-user"></i>
                    </div>
                  )
                }}
                v-model={data.formData.username}
                type="text"
                placeholder="请输入账号"
              ></ElInput>
            </ElFormItem>
            <ElFormItem
              prop="password"
              rules={[{ required: true, message: '请输入密码', trigger: ['blur', 'change'] }]}
            >
              <ElInput
                v-slots={{
                  prefix: () => (
                    <div class="pl-1">
                      <i style="font-size: 16px;" class="el-icon-lock"></i>
                    </div>
                  )
                }}
                v-model={data.formData.password}
                type="password"
                placeholder="请输入密码"
              />
            </ElFormItem>
            <ElFormItem>
              <ElButton onClick={() => handleSubmit()} type="primary" class=" w-full">
                登录
              </ElButton>
            </ElFormItem>
          </ElForm>
        </div>
      )
    }
  }
})
