import store from '../store/index'
import ru from '../localize/ru.json'
import en from '../localize/en.json'
const locals = {
  'ru-RU':ru,
  'en-US':en
}

export default function localizeFilter(key) { 
  const locale = store.getters.info.locale || 'ru-RU' 
  return locals[locale][key] || `[Localize ERROR] - key ${key} not found `
 }
