import React, { FC, useContext } from 'react';
import cn from 'classnames';

import styles from './styles.module.scss';

import { ScrollContext } from '../scrollManager';

export const NavItem: FC<Record<string, string>> = ({ title, type }) => {
  const { currentHeading } = useContext(ScrollContext);

  const pageTitle = title.split('/').pop();

  const titleSlug = '/' + title.toLowerCase().replace(' ', '_');

  const isHome = currentHeading === '/' && title === 'Home';
  const selected = currentHeading === titleSlug || isHome;

  const classForItem = { [styles['selected']]: selected,
    [styles['separator']]:type === 'separator' };

  return <div className={cn(styles.nav_item, classForItem)}>
    <p>{ pageTitle }</p>
  </div>;
};
