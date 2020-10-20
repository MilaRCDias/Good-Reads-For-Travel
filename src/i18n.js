import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
const resources = {
  en: {
    translation: {
      result_label: "Results for",
      book_title_label: "by",
      published_in: "Published in",
      label_in: "in",
      languages_label: "languages",
      subject_label: "Subject:",
    },
  },
  pt: {
    translation: {
      result_label: "Resultados para",
      book_title_label: "por",
      published_in: "Publicado em",
      label_in: "em",
      languages_label: "idiomas",
      subject_label: "Assunto:",
    },
  },

  fr: {
    translation: {
      result_label: "Résultats pour",
      book_title_label: "pour",
      published_in: "Publié dans",
      label_in: "dans",
      languages_label: "langues",
      subject_label: "Sujet:",
    },
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, 
    },
  });

export default i18n;