import React, { ReactNode } from 'react';

import styles from './styles.module.scss';
import LanguageSelector from '@/components/LanguageSelector';

export const Parameters = (props: { children: ReactNode }) => (
  <>
    <div className={styles.parameterHeading}>
      <h3>Parameters</h3>
      <LanguageSelector style={'icon'} />
    </div>
    <div className={styles.parameters}>{props.children}</div>
  </>
);

export const Response = (props: { children: ReactNode }) => (
  <>
    <div className={styles.parameterHeading}>
      <h3>Response</h3>
      <LanguageSelector style={'icon'} />
    </div>
    <div className={styles.parameters}>{props.children}</div>
  </>
);
