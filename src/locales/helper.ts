import { LocaleType } from '#/store'
import { set } from 'lodash-es'

export const loadLocale: LocaleType[] = []

export function setHtmlPageLang(locale: LocaleType) {
  document.querySelector('html')?.setAttribute('lang', locale)
}

export function setLoadLocale(cb: (loadLocale: LocaleType[]) => void) {
  cb(loadLocale)
}

export function spliceMessage(langs: Record<string, Record<string, any>>, prefix: string) {
  const obj: Record<string, any> = {}
  for (const key in langs) {
    const fileData = langs[key].default
    const keyPath = key.replace(`./${prefix}/`, '').replace('.ts', '')
    const pathArray = keyPath.split('/')
    let modules = obj
    pathArray.forEach((path, index) => {
      index === pathArray.length - 1
        ? set(modules, path, fileData || {})
        : modules[path] === undefined && set(modules, path, {})
      modules = modules[path]
    })
  }
  return obj
}
