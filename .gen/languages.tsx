import React, { ReactElement } from 'react';
import { Columns, RHS } from '@/components/Columns';
import TextHeaderWrapper from '@/HOC/TextHeaderWrapper';
import LanguageSwitcher from '@/HOC/LanguageSwitcher';
import newLanguageProvider from 'HOC/LanguageProvider';
import { Parameters } from '@/components/parameters';

// REPLACE USAGE WITH HOC/LanguageProvider
export const LanguageProvider = newLanguageProvider;

// REPLACE USAGE WITH HOC/LanguageProvider
/* export const LanguageSelect = () => {
    const langContext = useContext(LangContext);
    return (
        <button style={{background: "tomato", margin: "24px", padding: "10px"}}
                onClick={() => langContext.setLang(langContext.lang === "go" ? "typescript" : "go")}>
            Language:
            {langContext.lang}
        </button>
    )
} */

// REPLACE USAGE WITH HOC/LanguageSwitcher
export const LanguageSwitch = LanguageSwitcher;

export const LanguageOperation = (props: {
  usage: ReactElement;
  parameters: ReactElement;
  response: ReactElement;
}) => {
  return (
    <Columns>
      <Parameters>
        {props.parameters}
      </Parameters>
      <TextHeaderWrapper headingType="h3">Response</TextHeaderWrapper>
      {props.response}
      <RHS>{props.usage}</RHS>
    </Columns>
  );
};
