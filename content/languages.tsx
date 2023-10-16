import React, { ReactElement } from 'react';

import TextHeaderWrapper from '@/HOC/TextHeaderWrapper';
import LanguageSwitcher from '@/HOC/LanguageSwitcher';
import newLanguageProvider from 'HOC/LanguageProvider';
import { Columns, RHS } from '@/components/Columns';
import { Parameters } from '@/components/parameters';

// REPLACE USAGE WITH HOC/LanguageProvider
export const LanguageProvider = newLanguageProvider;

// REPLACE USAGE WITH HOC/LanguageSwitcher
export const LanguageSwitch = LanguageSwitcher;

export const LanguageOperation = (props: {
  usage: ReactElement;
  parameters: ReactElement;
  response: ReactElement;
}) => (
  <Columns>
    <Parameters>{props.parameters}</Parameters>
    <TextHeaderWrapper headingType='h3'>Response</TextHeaderWrapper>
    {props.response}
    <RHS>{props.usage}</RHS>
  </Columns>
);