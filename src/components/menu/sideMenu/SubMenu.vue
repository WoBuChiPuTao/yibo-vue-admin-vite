<template>
  <SubMenuItem
    v-if="hasChildrenMenu(item)"
    :class="getLevelClass"
    :name="item.path"
    :collapsed="collapsed"
  >
    <template #title>
      <EIcon
        v-if="getCeil"
        class="menu-list-submenu-title-iconfont"
        :icon="item.icon?.name"
        :post-icon="item.icon?.entity"
      ></EIcon>
      <span v-if="!collapsed" class="menu-list-submenu-title-name"> {{ getI18nName }}</span>
    </template>
    <template v-for="childrenItem in item.children || []" :key="childrenItem.path">
      <SubMenu v-if="!collapsed" :item="childrenItem" :parent="false"></SubMenu>
    </template>
  </SubMenuItem>
  <MenuItem v-else :class="getLevelClass" :name="item.path" :collapsed="collapsed">
    <EIcon
      v-if="getCeil"
      class="menu-list-item-iconfont"
      :icon="item.icon?.name"
      :post-icon="item.icon?.entity"
    ></EIcon>
    <span v-if="!collapsed" class="menu-list-item-name">{{ getI18nName }}</span>
  </MenuItem>
</template>

<script lang="ts">
import { Menu } from '#/list'
import { computed, defineComponent, PropType } from 'vue'
import SubMenuItem from './SubMenuItem.vue'
import MenuItem from './MenuItem.vue'
import EIcon from '@/components/icons/EIcon.vue'
import { useI18n } from '@/hooks/web/useI18n'

export default defineComponent({
  name: 'SubMenu',
  components: { MenuItem, EIcon, SubMenuItem },
  props: {
    item: {
      type: Object as PropType<Menu>,
      default: () => ({})
    },
    parent: Boolean,
    collapsed: Boolean
  },
  setup(props) {
    // 多国语言
    const { t } = useI18n()
    const getI18nName = computed(() => {
      return t(props.item.name)
    })

    // 是否为顶层
    const getCeil = computed(() => {
      return !!props.parent
    })
    // 菜单层次样式
    const getLevelClass = computed(() => {
      return [
        {
          'menu-parent': props.parent,
          'menu-children': !props.parent
        }
      ]
    })

    function hasChildrenMenu(item: Menu): boolean {
      if (item.children && item.children.length > 0) {
        return true
      } else {
        return false
      }
    }
    return {
      hasChildrenMenu,
      getLevelClass,
      getCeil,
      getI18nName
    }
  }
})
</script>
