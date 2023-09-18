import React, {
  useContext,
  FC,
} from 'react';

import { LanguageContext } from '@/utils/contexts/languageContext';
import { LANGUAGES } from '@/utils/enums/languages';

interface ILanguageSwitcher {
  langToContent: Partial<Record<LANGUAGES, JSX.Element>>,
}

const LanguageSwitcher: FC<ILanguageSwitcher> = ({ langToContent }) => {
  const { language } = useContext(LanguageContext);

  return <>{langToContent[language]}</>;
};

export default LanguageSwitcher;
