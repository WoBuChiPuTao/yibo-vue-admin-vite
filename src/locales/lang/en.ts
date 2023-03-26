import elLocale from 'element-plus/es/locale/lang/en'
import { spliceMessage } from '../helper'

// const files = require.context('./en', true, /\.ts$/, 'sync')
const files = import.meta.glob<Record<string, any>>('./en/**/*.ts', { eager: true })

const messages = spliceMessage(files, 'en')

export default {
  message: {
    ...messages,
    elLocale
  }
}
