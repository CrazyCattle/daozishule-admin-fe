import { defineComponent, reactive } from 'vue'
import { RouterView } from 'vue-router'
import {
  ElContainer,
  ElHeader,
  ElAside,
  ElMain,
  ElMenu,
  ElSubMenu,
  ElMenuItem,
  ElDropdown,
  ElDropdownMenu,
  ElDropdownItem
} from 'element-plus'

import Logo from '@/assets/images/dzsl.png'

export default defineComponent({
  props: {},
  emits: [],
  components: {},
  setup(props, ctx) {
    const data = reactive({
      isLogin: false
    })
    return () => {
      return (
        <ElContainer style="height: 100vh;">
          <ElHeader class="bg-white flex items-center justify-between border-b-2">
            <div class="h-full flex items-center text-gray-400">
              <img class="h-full mr-5" src={Logo} alt="" /> 美好的季节到来，稻子熟了~ Oh, yeah !
            </div>
            <div>
              <ElDropdown
                v-slots={{
                  dropdown: () => (
                    <ElDropdownMenu>
                      <ElDropdownItem>前往首页</ElDropdownItem>
                      <ElDropdownItem>退出</ElDropdownItem>
                    </ElDropdownMenu>
                  )
                }}
              >
                <span>管理员</span>
                <i class="el-icon-setting ml-2"></i>
              </ElDropdown>
            </div>
          </ElHeader>

          <ElContainer>
            <ElAside width="200px" style="background-color: #fff">
              <ElMenu defaultOpeneds={['1', '2']} style="border: none;">
                <ElSubMenu
                  index="1"
                  v-slots={{
                    title: () => (
                      <div class="flex items-center">
                        <i class="el-icon-collection"></i>文章
                      </div>
                    )
                  }}
                >
                  <ElMenuItem index="1-1">文章管理</ElMenuItem>
                </ElSubMenu>
                <ElSubMenu
                  index="2"
                  v-slots={{
                    title: () => (
                      <div class=" flex items-center">
                        <i class="el-icon-collection-tag"></i>标签
                      </div>
                    )
                  }}
                >
                  <ElMenuItem index="2-1">标签管理</ElMenuItem>
                </ElSubMenu>
              </ElMenu>
            </ElAside>
            <ElMain style="padding: 10px;">
              <RouterView />
            </ElMain>
          </ElContainer>
        </ElContainer>
      )
    }
  }
})
