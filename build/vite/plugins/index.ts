import { PluginOption } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { viteHtmlPlugin } from './html'

export function createViteplugins(env: ViteEnv, isBuild: boolean): PluginOption[] {
  const vitePlugins: (PluginOption | PluginOption[])[] = [vue(), vueJsx()]

  vitePlugins.push(viteHtmlPlugin(env, isBuild))
  return vitePlugins
}
