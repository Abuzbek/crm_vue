import locaizeFilter from '@/filters/localize.filter'

export default {
  install(Vue) {
    Vue.prototype.$title = function(titleKey) {
      return `${locaizeFilter(titleKey)} | ${'AbuzCoder'}`
    }
  }
}
