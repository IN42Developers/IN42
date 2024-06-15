// import '@formatjs/intl-pluralrules/polyfill';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import  ger  from "./ger";
import  en  from "./en";
import { TranslationKeys } from '../../src/types/languageTranslation';

declare module 'i18next' {
    interface CustomTypeOptions {
      defaultNS: 'translation';
      resources: {
        translation: TranslationKeys;
      };
    }
  }

  i18n
  .use(initReactI18next)
  .init({
    compatibilityJSON: 'v3',
    resources: {
      en: { translation: en },
      ger: { translation: ger },
    },
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // React already escapes values to prevent XSS
    },
  });

export default i18n;