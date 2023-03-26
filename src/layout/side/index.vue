<template>
  <div class="side-fill" :style="getDomStyle" />
  <div class="side-fixed" :style="getDomStyle">
    <AppLogo class="side-logo" />
    <SideMenu />
  </div>
</template>

<script lang="ts">
import { computed, CSSProperties, defineComponent, unref } from 'vue'
import AppLogo from '@/components/application/AppLogo.vue'
import SideMenu from '@/components/menu/LayoutMenu.vue'

import { useMenuSetting } from '@/hooks/setting/useMenuSetting'
export default defineComponent({
  name: 'AppSide',
  components: { SideMenu, AppLogo },
  setup() {
    const { getRealWidth } = useMenuSetting()
    const getDomStyle = computed((): CSSProperties => {
      const width = `${unref(getRealWidth)}px`
      return {
        width,
        overflow: 'hidden',
        flex: `0 0 ${width}`,
        maxWidth: width,
        minWidth: width
      }
    })
    return {
      getDomStyle
    }
  }
})
</script>

<style lang="less">
.side-fill {
  height: 100%;
  transition: all 0.2s;
}

.side-fixed {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  height: 100%;
  background-color: var(--sider-bg-color);
  transition: all 0.2s;
}

.side-logo {
  padding: 10px 8px 10px 8px;
  height: 64px;
  color: white;
}
</style>
