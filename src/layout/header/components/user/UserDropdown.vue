<template>
  <ElDropdown>
    <span class="header-user-dropdown">
      <img :src="getUserInfo.avatar" alt="avatar" class="header-user-dropdown-avatar" />
      <span class="truncate header-user-dropdown-name">
        {{ getUserInfo.username }}
      </span>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item :icon="Document">
          <a
            href="https://github.com/WoBuChiPuTao/yibo-vue-admin"
            target="_blank"
            rel="noopener noreferrer"
            >查看文档</a
          >
        </el-dropdown-item>
        <el-dropdown-item :icon="SwitchButton" @click="toLogout"> 退出登录 </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </ElDropdown>
</template>

<script lang="ts" setup>
import { ElDropdown, ElDropdownMenu, ElDropdownItem, ElMessageBox } from 'element-plus'
import { Document, SwitchButton } from '@element-plus/icons-vue'
import { useUserStore } from '@/store/modules/user'
import { computed, h } from 'vue'
import { useI18n } from '@/hooks/web/useI18n'
import headerImg from '@/assets/img/avatar.png'

const userStore = useUserStore()
const { t } = useI18n()

const getUserInfo = computed(() => {
  const { username = 'nibabassssss', avatar, desc } = userStore.getUserInfo || {}
  return { username, avatar: avatar || headerImg, desc }
})
async function toLogout() {
  try {
    await ElMessageBox.confirm(
      () => h('span', t('sys.app.logoutMessage')),
      t('sys.app.logoutTip'),
      {
        confirmButtonText: t('common.okText'),
        cancelButtonText: t('common.cancelText'),
        type: 'warning'
      }
    )
    await userStore.logout(true)
  } catch (error) {}
}
</script>

<style lang="less">
@import '/src/style/var/index.less';

.header-user-dropdown {
  display: flex;
  align-items: center;
  overflow: hidden;
  padding: 0 0 0 10px;
  padding-right: 10px;
  height: @header-height;
  font-size: 12px;
  cursor: pointer;

  img {
    margin-right: 12px;
    width: 24px;
    height: 24px;
  }

  &-avatar {
    border-radius: 50%;
  }

  &-name {
    font-size: 1rem;
    line-height: @header-height;
  }
}
</style>
