

const dictionaries = {
  en: () => import('./dictionaries/en.json').then((module) => module.default),
  fr: () => import('./dictionaries/fr.json').then((module) => module.default),
}
 
export const getClientDictionary = async (locale: any) => dictionaries[locale as ("en"|"fr")]()