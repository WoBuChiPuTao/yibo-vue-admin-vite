import { Menu } from '#/list'
import { isUrl } from '@/hooks/is'
import { findPath, treeMap } from '@/hooks/tree'
import { cloneDeep } from 'lodash-es'
import { AddRouteRecordRaw } from '../types'

/**
 * @description 得到父级菜单路径
 */
export function getAllParentPath<T = Recordable>(treeData: T[], path: string) {
  const menuList = findPath(treeData, n => n.path === path) as Menu[]
  return (menuList || []).map(item => item.path)
}

// 拼接父级的路径
function joinParentPath(menus: Menu[], parentPath = '') {
  for (let index = 0; index < menus.length; index++) {
    const menu = menus[index]
    // 判断是否为根路由或地址
    if (!(menu.path.startsWith('/') || isUrl(menu.path))) {
      menu.path = `${parentPath}/${menu.path}`
    }
    if (menu?.children?.length) {
      joinParentPath(menu.children, menu.path)
    }
  }
}

// 将路由转换为menu
export function routeToMenu(routes: AddRouteRecordRaw[]) {
  const cloneRouteList = cloneDeep(routes)
  const list = treeMap(cloneRouteList, {
    conversion: (node: AddRouteRecordRaw) => {
      const { meta: { title, hideMenu = false } = {} } = node

      return {
        ...(node.meta || {}),
        meta: node.meta,
        name: title,
        hideMenu,
        path: node.path,
        ...(node.redirect ? { redirect: node.redirect } : {})
      }
    }
  })
  joinParentPath(list as Menu[])
  list.forEach(item => {
    // 单个不显示子菜单重定向
    if (
      item.children?.length === 1 &&
      item.children[0]?.meta.hideMenu === true &&
      typeof item.redirect === 'string'
    ) {
      item.path = item.redirect
    }
  })
  return cloneDeep(list) as Menu[]
}
