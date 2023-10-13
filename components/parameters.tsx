import React, { ReactNode } from 'react';
import styles from '@/components/styles.module.scss';
import TextHeaderWrapper from '@/HOC/TextHeaderWrapper';
import LanguageSelector from '@/components/LanguageSelector';

export const Parameters = (props: { children: ReactNode }) => {
  return (
    <>
      <TextHeaderWrapper headingType='h3'>
        Parameters
        <LanguageSelector style={'icon'} />
      </TextHeaderWrapper>
      <div className={styles.parameters}>{props.children}</div>
    </>
  );
};
