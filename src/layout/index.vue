<template>
  <ElContainer class="layout">
    <Side v-if="getShowSideMenu"></Side>
    <ElContainer class="layout-main">
      <Header></Header>
      <ElMain class="layout-main-content">
        <Content></Content>
      </ElMain>
    </ElContainer>
  </ElContainer>
</template>

<script lang="ts" setup>
import { ElContainer, ElMain } from 'element-plus'
import Header from './header/index.vue'
import Side from './side/index.vue'
import Content from './content/index.vue'
import { useMenuSetting } from '@/hooks/setting/useMenuSetting'

const { getShowSideMenu } = useMenuSetting()
</script>

<style lang="less">
.layout {
  height: 100vh;
  width: 100vw;

  .layout-main {
    display: flex;
    flex-direction: column;
    //background: #f0f2f5;

    &-content {
      padding: 0;
      overflow-x: hidden;
      position: relative;
    }
  }
}
</style>
