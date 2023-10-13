import React, { Children, FC, ReactNode, useState } from 'react';

import { Language, Languages } from '@/utils/enums/language';
import { LanguageContext } from '@/utils/contexts/languageContext';

interface ILanguageProvider {
  children: ReactNode;
}

const LanguageProvider: FC<ILanguageProvider> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('go');
  const context = {
    language,
    setLanguage,
    languages: Languages,
  };

  const childrenArray = Children.toArray(children);

  return (
    <LanguageContext.Provider value={context}>
      {childrenArray.map((child) => child)}
    </LanguageContext.Provider>
  );
};

export default LanguageProvider;
