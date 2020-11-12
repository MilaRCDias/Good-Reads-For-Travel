import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';


/**
 *  File with translations ids of i18next internalization
 */

const resources = {
  en: {
    translation: {
      result_label: "Results for",
      book_title_label: "by",
      published_in: "Published in",
      label_in: "in",
      languages_label: "Languages",
      subject_label: "Subject:",
      filter_label: "Filter",
      filter_travel: "travel",
      filter_novel: "novel",
      filter_culture: "culture",
      label_english: "English",
      label_french: "Français",
      label_portuguese: "Português",
      itensPage_label: "Itens By Page",
      itensPage_10: "10",
      itensPage_20: "20",
      itensPage_30: "30",
      itensPage_40: "40",
      page_range_itens_of: "itens of",
      page_range_books: "books",
     

    },
  },
  pt: {
    translation: {
      result_label: "Resultados para",
      book_title_label: "por",
      published_in: "Publicado em",
      label_in: "em",
      languages_label: "Idiomas",
      subject_label: "Assunto:",
      filter_label: "Filtrar por",
      filter_travel: "travel",
      filter_novel: "novel",
      filter_culture: "cultura",
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
      languages_label: "Langues",
      subject_label: "Sujet:",
      filter_label: "Filtre par",
      filter_travel: "voyage",
      filter_novel: "roman",
      filter_culture: "culture",
      label_english: "English",
      label_french: "Français",
      label_portuguese: "Português",
    },
    /* insert prop for new lang */
    
  },
};

/**
 * Setup of i18next multi language 
 */
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