import { resolve } from 'path'
import type { ConfigEnv, UserConfig } from 'vite'
import { loadEnv } from 'vite'
import { wrapperEnv } from './build/utils'
import { createViteplugins } from './build/vite/plugins'

function pathResolve(dir: string) {
  return resolve(process.cwd(), '.', dir)
}

// https://vitejs.dev/config/
export default ({ command, mode }: ConfigEnv): UserConfig => {
  //环境变量
  const envObj = loadEnv(mode, pathResolve('env'))
  const env = wrapperEnv(envObj)
  const isBuild = command === 'build'

  return {
    resolve: {
      alias: [
        {
          find: 'vue-i18n',
          replacement: 'vue-i18n/dist/vue-i18n.cjs.js'
        },
        // 替换@为src
        {
          find: /@\//,
          replacement: pathResolve('src') + '/'
        },
        //  替换#为types
        {
          find: /#\//,
          replacement: pathResolve('types') + '/'
        }
      ]
    },
    envDir: pathResolve('env'),
    plugins: createViteplugins(env, isBuild),
    css: {
      preprocessorOptions: {
        less: {
          modifyVars: {},
          javascriptEnabled: true
        }
      }
    }
  }
}
