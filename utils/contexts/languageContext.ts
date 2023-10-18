import { createContext } from 'react';

import { Language } from '@/utils/enums/language';

export const LanguageContext = createContext<{
  language: Language;
  setLanguage: (l: Language) => void;
  languages: Language[];
}>({
  language: 'go',
  setLanguage: () => {},
  languages: [],
});
