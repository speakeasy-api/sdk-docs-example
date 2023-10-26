import React, { FC, useContext } from 'react';
import cn from 'classnames';

import styles from './styles.module.scss';

import { ScrollContext } from '../scrollManager';

export const NavItem: FC<Record<string, string>> = ({ route, title, type }) => {
  const { scrollTo } = useContext(ScrollContext);

  const classForItem = {
    [styles['visible']]: false,
    [styles['separator']]: type === 'separator',
  };

  if (route == '/') {
    return null;
  }

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        scrollTo(route);
      }}
      className={cn(styles.nav_item, classForItem)}
    >
      <p>{title}</p>
    </div>
  );
};
