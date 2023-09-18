import React, {
  ReactNode,
  Children,
  cloneElement,
  ReactElement,
  FC,
  useState,
} from 'react';

import LanguageSelector from '@/components/LanguageSelector';
import { LANGUAGES } from '@/utils/enums/languages';
import { LanguageContext } from '@/utils/contexts/languageContext';

import styles from './styles.module.scss';

interface ILanguageProvider {
  children: ReactNode,
  languageList: LANGUAGES[],
}

const LanguageProvider: FC<ILanguageProvider> = ({ children, languageList }) => {
  const [language, setLanguage] = useState<LANGUAGES>(languageList[0]);
  const context = {
    language,
    setLanguage,
  };

  const firstChild = Children.toArray(children)[0];
  const otherChildren = Children.toArray(children).slice(1);

  return (
    <LanguageContext.Provider value={context}>
      <div className={styles.firstElementWithLanguageSelector}>
        <div>
          {cloneElement(firstChild as ReactElement)}
        </div>
        <LanguageSelector languageList={languageList} />
      </div>
      {otherChildren.map((child) => child)}
    </LanguageContext.Provider>
  );
};

export default LanguageProvider;
