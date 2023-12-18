import React, {
  ReactElement,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
} from 'react';
import { Columns, RHS } from '@/src/components/Columns';
import {
  Authentication,
  Parameters,
  Response,
} from '@/src/components/Parameters';
import { LanguageContext } from '@/src/utils/contexts/languageContext';
import { LinkableContext } from '@/src/utils/contexts/linkableContext';
import { usePathname } from 'next/navigation';
import { useSetPage } from '@/src/components/scrollManager';

export const Languages = ["go", "typescript", "python", "java", "csharp", "unity", "curl"];
export type Language = (typeof Languages)[number];
export const DefaultLanguage = 'java';

export const LanguageProvider = (props: { children: ReactNode }) => {
  const slug = usePathname();
  const setPage = useSetPage();

  const language = useMemo(() => {
    // slug is in the form "/typescript/installation" (or null)
    const routeLang = slug?.split('/')[1];

    return routeLang || DefaultLanguage;
  }, [slug]);

  const setLanguage = useCallback(
    (newLanguage: string) => {
      const langRoutePrefix = (lang: string) => `/${lang}/`;

      // Using window.location.pathname because router.asPath often has [...rest] in it
      const newPath = window.location.pathname.replace(
        langRoutePrefix(language),
        langRoutePrefix(newLanguage),
      );

      setPage(newPath);
    },
    [language, setPage],
  );

  const context = {
    language,
    setLanguage,
    languages: Languages,
  };

  return (
    <LanguageContext.Provider value={context}>
      {props.children}
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
  authentication?: ReactElement;
  parameters: ReactElement;
  response: ReactElement;
}) => (
  <Columns>
    {props.authentication ? (
      <Authentication>{props.authentication}</Authentication>
    ) : null}
    <Parameters>{props.parameters}</Parameters>
    <Response>{props.response}</Response>
    <RHS>{props.usage}</RHS>
  </Columns>
);
