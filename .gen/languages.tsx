import React, { ReactElement } from 'react';

import LanguageSwitcher from '@/HOC/LanguageSwitcher';
import newLanguageProvider from 'HOC/LanguageProvider';
import { Columns, RHS } from '@/components/Columns';
import { Parameters, Response } from '@/components/parameters';

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
    <Response>{props.response}</Response>
    <RHS>{props.usage}</RHS>
  </Columns>
);