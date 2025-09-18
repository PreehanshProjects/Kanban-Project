import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

const resources = {
  en: { translation: { "appTitle": "Kanban", "newBoard": "New board", "create": "Create", "cancel": "Cancel" } },
  fr: { translation: { "appTitle": "Kanban", "newBoard": "Nouveau tableau", "create": "Créer", "cancel": "Annuler" } }
}

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  interpolation: { escapeValue: false }
})

export default i18n
