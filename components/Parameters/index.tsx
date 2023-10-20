import React, { ReactNode } from 'react';

import LanguageSelector from '@/components/LanguageSelector';
import { H3 } from '@/HOC/TextHeaderWrapper';

import styles from './styles.module.scss';

export const Parameters = (props: { children: ReactNode }) => (
  <>
    <div className={styles.parameterHeading}>
      <H3>Parameters</H3>
      <LanguageSelector style={'icon'} />
    </div>
    <div className={styles.parameters}>{props.children}</div>
  </>
);

export const Response = (props: { children: ReactNode }) => (
  <>
    <div className={styles.parameterHeading}>
      <H3>Response</H3>
      <LanguageSelector style={'icon'} />
    </div>
    <div className={styles.parameters}>{props.children}</div>
  </>
);
