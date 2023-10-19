import React, {
  Children,
  ReactElement,
  ReactNode,
  useContext,
  useState,
} from 'react';
import { Columns, RHS } from '@/components/Columns';
import { Parameters, Response } from '@/components/Parameters';
import { LanguageContext } from '@/utils/contexts/languageContext';
import { LinkableContext } from '@/utils/contexts/linkableContext';

export const Languages = [
  'go',
  'typescript',
  'java',
  'csharp',
  'python',
  'unity',
];
export type Language = (typeof Languages)[number];

export const LanguageProvider = (props: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('go');
  const context = {
    language,
    setLanguage,
    languages: Languages,
  };

  const childrenArray = Children.toArray(props.children);

  return (
    <LanguageContext.Provider value={context}>
      {childrenArray.map((child) => child)}
    </LanguageContext.Provider>
  );
};

export const LanguageSwitch = (props: {
  langToContent: Partial<Record<Language, JSX.Element>>;
}) => {
  const { language } = useContext(LanguageContext);

  return (
    <LinkableContext.Provider value={false}>
      {props.langToContent[language]}
    </LinkableContext.Provider>
  );
};

export const LanguageOperation = (props: {
  usage: ReactElement;
  parameters: ReactElement;
  response: ReactElement;
}) => (
  <Columns>
    <Parameters>{props.parameters}</Parameters>
    <Response>{props.response}</Response>
    <RHS>{props.usage}</RHS>
  </Columns>
);
