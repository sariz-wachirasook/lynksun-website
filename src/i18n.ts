import { initReactI18next } from 'react-i18next';
import i18n from 'i18next';
import en from './locales/en.json';
import th from './locales/th.json';
import { getCookie } from './utils/cookie';

const locale = getCookie('locale') || 'en';

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources: {
      en: { translation: en },
      th: { translation: th },
    },
    lng: locale,
    fallbackLng: 'en',

    interpolation: {
      escapeValue: false,
    },
  });
