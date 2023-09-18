import { createContext } from 'react';

import { LANGUAGES } from '@/utils/enums/languages';

export const LanguageContext = createContext<{ language: LANGUAGES; setLanguage: (l: LANGUAGES) => void }>({
  language: LANGUAGES.go,
  setLanguage: () => {},
});
