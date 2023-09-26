import React, { FC, useContext } from 'react';
import cn from 'classnames';

import { toRouteFormat } from '@/utils/routesHelpers';

import styles from './styles.module.scss';

import { ScrollContext } from '../scrollManager';

export const NavItem: FC<Record<string, string>> = ({ title, type }) => {
  const { currentHeading } = useContext(ScrollContext);

  const pageTitle = title.split('/').pop();

  const titleSlug = '/' + toRouteFormat(title.toLowerCase());

  const baseHeading = currentHeading && currentHeading.split('#')[0];

  const selected = baseHeading === titleSlug;

  const classForItem = { [styles['selected']]: selected,
    [styles['separator']]:type === 'separator' };

  return <div className={cn(styles.nav_item, classForItem)}>
    <p>{ pageTitle }</p>
  </div>;
};
