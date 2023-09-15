import React, {
  ReactElement, ReactNode, useContext, useState, createContext, FC,
} from 'react';

import { Language } from '@/generated/language';

const LangContext = createContext<{ lang: Language, setLang: (l: Language) => void }>({
  lang: 'go',
  setLang: (lang) => {},
});

type TProps = {
  children: ReactNode
};

export const LanguageProvider: FC<TProps> = ({ children }) => {
  const [lang, setLang] = useState<Language>('go');
  const context = {
    lang,
    setLang,
  };

  return (
    <LangContext.Provider value={ context }>
      { children }
    </LangContext.Provider>
  );
};

export const LanguageSelect = () => {
  const langContext = useContext(LangContext);

  return (
    <button style={{
      background: 'tomato',
      margin: '24px',
      padding: '10px',
    }}
    onClick={ () => langContext.setLang(langContext.lang === 'go' ? 'typescript' : 'go') }>
            Language:
      { langContext.lang }
    </button>
  );
};

export const LanguageSwitch = (props: { langToContent: Record<Language, ReactNode> }): ReactElement => {
  const lang = useContext(LangContext).lang;

  return <>{ props.langToContent[lang] }</>;
};
