import elLocale from 'element-plus/es/locale/lang/zh-cn'
import { spliceMessage } from '../helper'

// const files = require.context('./zh_cn', true, /\.ts$/, 'sync')
const files = import.meta.glob<Record<string, any>>('./zh_cn/**/*.ts', { eager: true })

const messages = spliceMessage(files, 'zh_cn')

export default {
  message: {
    ...messages,
    elLocale
  }
}
