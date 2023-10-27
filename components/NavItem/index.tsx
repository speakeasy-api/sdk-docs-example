import React, { FC, useContext, useMemo } from 'react';
import cn from 'classnames';

import styles from './styles.module.scss';

import { ScrollContext } from '../scrollManager';
import { getPagesUnderRoute } from 'nextra/context';

export const NavItem: FC<Record<string, string>> = ({ route, title, type }) => {
  const { scrollTo } = useContext(ScrollContext);

  const isFolder = useMemo(() => getPagesUnderRoute(route).length > 0, []);

  const classForItem = {
    [styles['visible']]: false,
    [styles['separator']]: type === 'separator',
  };

  if (route == '/') {
    return null;
  }

  const handleClick = (e: any) => {
    if (!isFolder) {
      e.stopPropagation();
      scrollTo(route);
    }
  };

  return (
    <div onClick={handleClick} className={cn(styles.nav_item, classForItem)}>
      <p>{title}</p>
    </div>
  );
};
