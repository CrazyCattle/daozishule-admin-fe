import { defineComponent, reactive } from 'vue'
import '@/assets/less/common.less'
import {
  ElContainer,
  ElHeader,
  ElAside,
  ElMain,
  ElTable,
  ElTableColumn,
  ElMenu,
  ElSubMenu,
  ElMenuItem,
  ElMenuItemGroup,
  ElDropdown,
  ElDropdownMenu,
  ElDropdownItem
} from 'element-plus'

export default defineComponent({
  props: {},
  emits: [],
  components: {},
  setup(props, ctx) {
    const data = reactive({
      title: 'title',
      dropdown: false,
      tableData: new Array(30).fill({
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      })
    })
    return () => (
      <ElContainer style="height: 100vh; border: 1px solid #eee">
        <ElHeader style="text-align: right; background-color: #fff;">
          <ElDropdown
            v-slots={{
              dropdown: () => (
                <ElDropdownMenu>
                  <ElDropdownItem>查看</ElDropdownItem>
                  <ElDropdownItem>新增</ElDropdownItem>
                  <ElDropdownItem>删除</ElDropdownItem>
                </ElDropdownMenu>
              )
            }}
          >
            <i class="el-icon-setting" style="margin-right: 15px"></i>
          </ElDropdown>
          <span>王小虎</span>
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
            <ElTable data={data.tableData} height="300">
              <ElTableColumn prop="date" label="日期" width="140"></ElTableColumn>
              <ElTableColumn prop="name" label="姓名" width="120"></ElTableColumn>
              <ElTableColumn prop="address" label="地址"></ElTableColumn>
            </ElTable>
          </ElMain>
        </ElContainer>
      </ElContainer>
    )
  }
})
