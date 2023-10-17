import React, { ReactNode } from 'react';
import styles from '@/components/styles.module.scss';
import LanguageSelector from '@/components/LanguageSelector';

export const Parameters = (props: { children: ReactNode }) => {
  return (
    <>
      <h3>
        Parameters
        <LanguageSelector style={'icon'} />
      </h3>
      <div className={styles.parameters}>{props.children}</div>
    </>
  );
};

export const Response = (props: { children: ReactNode }) => {
  return (
    <>
      <h3>Response</h3>
      <div className={styles.parameters}>{props.children}</div>
    </>
  );
};
