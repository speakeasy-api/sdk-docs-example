import React, { ReactElement, ReactNode, FC } from 'react';

import {
  separateHeadingsAndOthers,
  splitByType,
} from '@/components/typeHelpers';

import styles from './styles.module.scss';

interface IColumns {
  children: ReactElement[] | ReactElement | undefined;
}

export const Columns: FC<IColumns> & { RHS: typeof RHS } = ({ children }) => {
  const [rhs = [], lhs = []] = splitByType(children, RHS);
  const mainContent = lhs.length || rhs.length ? lhs : children;

  const [headingsArray, othersArray] = separateHeadingsAndOthers(mainContent);

  const columns = (
    <div className={styles.container}>
      <div className={styles.headings}>{headingsArray}</div>
      <div className={styles.columnContainer}>
        <div className={styles.mainContent}>{othersArray}</div>
        <div className={styles.rightSideContent}>{rhs}</div>
      </div>
    </div>
  );

  return <div>{columns}</div>;
};

export const RHS = (props: { children: ReactNode }) => <>{props.children}</>;

Columns.RHS = RHS;
