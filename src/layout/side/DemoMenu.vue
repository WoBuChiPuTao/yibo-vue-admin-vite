<template>
  <ElScrollbar>
    <Menu :collapsed="collapsed" :menus="items" @select-menu-item="handleSelected">
      <template v-for="item in items" :key="item.path">
        <SubMenu :item="item" :parent="true" :collapsed="collapsed"></SubMenu>
      </template>
    </Menu>
  </ElScrollbar>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { ElScrollbar } from 'element-plus'
import Menu from '@/components/menu/sideMenu/SideMenuList.vue'
import SubMenu from '@/components/menu/sideMenu/SubMenu.vue'
import { Menu as MenuType } from '#/list'
import { useGo } from '@/hooks/web/usePage'
export default defineComponent({
  name: 'DemoMenu',
  components: { Menu, SubMenu, ElScrollbar },
  props: {
    items: {
      type: Array as PropType<MenuType[]>,
      default: () => []
    },
    collapsed: {
      type: Boolean,
      default: false
    }
  },
  setup() {
    const go = useGo()

    function handleSelected(key: string) {
      go(key)
    }

    return {
      handleSelected
    }
  }
})
</script>
