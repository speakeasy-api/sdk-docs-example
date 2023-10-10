import React, {
  useContext,
  FC,
} from 'react';

import { LanguageContext } from '@/utils/contexts/languageContext';
import { LANGUAGES } from '@/utils/enums/languages';
import { LinkableContext } from '@/utils/contexts/linkableContext';

interface ILanguageSwitcher {
  langToContent: Partial<Record<LANGUAGES, JSX.Element>>,
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
