import {Language} from '@constants';
import i18n from 'i18next';
import HttpBackend from 'i18next-http-backend';
import {initReactI18next} from 'react-i18next';
import {en, zh} from './languages';
import {loadStringFromStorage} from '@utils';

/**
 * Initializes the i18n library and sets up the translation configuration.
 */
async function initializeI18n() {
  // Load the selected language from AsyncStorage
  const selectedLanguage = await loadStringFromStorage('selectedLanguage');

  i18n
    .use(HttpBackend)
    .use(initReactI18next)
    .init({
      fallbackLng: 'en',
      debug: false,
      compatibilityJSON: 'v3',
      interpolation: {
        escapeValue: false,
      },
      backend: {
        loadPath: '/locales/{{lng}}/{{ns}}.json',
      },
      react: {
        useSuspense: false,
      },
      lng: selectedLanguage || Language.ZH, // Set the initial language here (e.g., 'en' or 'zh')
      resources: {
        en: {translation: en},
        zh: {translation: zh},
      },
    });
}

initializeI18n();

export default i18n;
