import React, { useContext, FC } from 'react';

import { LanguageContext } from '@/utils/contexts/languageContext';
import { Language } from '@/utils/enums/language';
import { LinkableContext } from '@/utils/contexts/linkableContext';

interface ILanguageSwitcher {
  langToContent: Partial<Record<Language, JSX.Element>>;
}

const LanguageSwitcher: FC<ILanguageSwitcher> = ({ langToContent }) => {
  const { language } = useContext(LanguageContext);

  return (
    <LinkableContext.Provider value={false}>
      {langToContent[language]}
    </LinkableContext.Provider>
  );
};

export default LanguageSwitcher;
