import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';


/**
 *  File with translations and setup of i18next internalization
 */

const resources = {
  en: {
    translation: {
      result_label: "Results for",
      book_title_label: "by",
      published_in: "Published in",
      label_in: "in",
      languages_label: "languages",
      subject_label: "Subject:",
      sortby_label: "Sort by",
      sortby_AZ: "A-Z",
      sortby_ZA: "Z-A",
      label_english: "English",
      label_french: "Français",
      label_portuguese: "Português",
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
      sortby_label: "Ordenar por",
      sortby_AZ: "A-Z",
      sortby_ZA: "Z-A",
      label_english: "English",
      label_french: "Français",
      label_portuguese: "Português",
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
      sortby_label: "Trier par",
      sortby_AZ: "A-Z",
      sortby_ZA: "Z-A",
      label_english: "English",
      label_french: "Français",
      label_portuguese: "Português",
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