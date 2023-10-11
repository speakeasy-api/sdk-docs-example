import React, {
  ReactNode,
  FC,
  useState,
  Children,
} from 'react';

import LanguageSelector from '@/components/LanguageSelector';
import { LANGUAGES } from '@/utils/enums/languages';
import { LanguageContext } from '@/utils/contexts/languageContext';

interface ILanguageProvider {
  children: ReactNode,
  languageList: LANGUAGES[],
}

const LanguageProvider: FC<ILanguageProvider> = ({ children, languageList }) => {
  const [language, setLanguage] = useState<LANGUAGES>(languageList[0]);
  const context = {
    language,
    setLanguage,
    languageList,
  };

  const childrenArray = Children.toArray(children);

  return (
    <LanguageContext.Provider value={context}>
      <LanguageSelector languageList={languageList} />
      {childrenArray.map((child) => child)}
    </LanguageContext.Provider>
  );
};

export default LanguageProvider;
