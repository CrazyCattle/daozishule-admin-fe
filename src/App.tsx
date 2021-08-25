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
  ElMenuItemGroup,
  ElDropdown,
  ElDropdownMenu,
  ElDropdownItem
} from 'element-plus'

import Logo from '@/assets/images/dzsl.png'
import '@/assets/less/common.less'

export default defineComponent({
  props: {},
  emits: [],
  components: {},
  setup(props, ctx) {
    return () => (
      <ElContainer style="height: 100vh; border: 1px solid #eee">
        <ElHeader class="bg-white flex items-center justify-between">
          <div class="h-full flex items-center text-gray-400">
            <img class="h-full mr-5" src={Logo} alt="" /> 美好的季节到来，稻子熟了~ Oh, yeah !
          </div>
          <div>
            <ElDropdown
              v-slots={{
                dropdown: () => (
                  <ElDropdownMenu>
                    <ElDropdownItem>前往</ElDropdownItem>
                    <ElDropdownItem>退出</ElDropdownItem>
                  </ElDropdownMenu>
                )
              }}
            >
              <span>王小虎</span>
              <i class="el-icon-setting ml-2"></i>
            </ElDropdown>
          </div>
        </ElHeader>

        <ElContainer>
          <ElAside width="200px" style="background-color: #fff">
            <ElMenu style="border: none;" default-openeds={['1']}>
              <ElSubMenu
                index="1"
                v-slots={{
                  title: () => (
                    <div>
                      <i class="el-icon-message"></i>导航一
                    </div>
                  )
                }}
              >
                <ElMenuItemGroup v-slots={{ title: () => <div>分组一</div> }}>
                  <ElMenuItem index="1-1">选项1</ElMenuItem>
                  <ElMenuItem index="1-2">选项2</ElMenuItem>
                </ElMenuItemGroup>
                <ElMenuItemGroup title="分组2">
                  <ElMenuItem index="1-3">选项3</ElMenuItem>
                </ElMenuItemGroup>
                <ElSubMenu
                  index="1-4"
                  v-slots={{
                    title: () => <div>选项4</div>
                  }}
                >
                  <ElMenuItem index="1-4-1">选项4-1</ElMenuItem>
                </ElSubMenu>
              </ElSubMenu>
              <ElSubMenu
                index="2"
                v-slots={{
                  title: () => (
                    <div>
                      <i class="el-icon-menu"></i>导航二
                    </div>
                  )
                }}
              >
                <ElMenuItemGroup
                  v-slots={{
                    title: () => <div>分组一</div>
                  }}
                >
                  <ElMenuItem index="2-1">选项1</ElMenuItem>
                  <ElMenuItem index="2-2">选项2</ElMenuItem>
                </ElMenuItemGroup>
                <ElMenuItemGroup title="分组2">
                  <ElMenuItem index="2-3">选项3</ElMenuItem>
                </ElMenuItemGroup>
                <ElSubMenu
                  index="2-4"
                  v-slots={{
                    title: () => <div>选项4</div>
                  }}
                >
                  <ElMenuItem index="2-4-1">选项4-1</ElMenuItem>
                </ElSubMenu>
              </ElSubMenu>
              <ElSubMenu
                index="3"
                v-slots={{
                  title: () => (
                    <div>
                      <i class="el-icon-setting"></i>导航三
                    </div>
                  )
                }}
              >
                <ElMenuItemGroup
                  v-slots={{
                    title: () => <div>分组一</div>
                  }}
                >
                  <ElMenuItem index="3-1">选项1</ElMenuItem>
                  <ElMenuItem index="3-2">选项2</ElMenuItem>
                </ElMenuItemGroup>
                <ElMenuItemGroup title="分组2">
                  <ElMenuItem index="3-3">选项3</ElMenuItem>
                </ElMenuItemGroup>
                <ElSubMenu
                  index="3-4"
                  v-slots={{
                    title: () => <div>选项4</div>
                  }}
                >
                  <ElMenuItem index="3-4-1">选项4-1</ElMenuItem>
                </ElSubMenu>
              </ElSubMenu>
            </ElMenu>
          </ElAside>
          <ElMain style="padding: 10px;">
            <RouterView/>
          </ElMain>
        </ElContainer>
      </ElContainer>
    )
  }
})
