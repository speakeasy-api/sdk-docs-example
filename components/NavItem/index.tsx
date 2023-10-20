import React, { FC, useContext } from 'react';
import cn from 'classnames';

import { toRouteFormat } from '@/utils/routesHelpers';

import styles from './styles.module.scss';

import { ScrollContext } from '../scrollManager';

export const NavItem: FC<Record<string, string>> = ({ route, title, type }) => {
  const { currentHeading, visibleHeadings } = useContext(ScrollContext);

  const pageTitle = title.split('/').pop();

  const titleSlug = '/' + toRouteFormat(title.toLowerCase());

  const baseCurrentHeading = currentHeading?.split('#')[0];
  const headings = visibleHeadings.map((heading) => heading?.split('#')[0]);

  const selected = baseCurrentHeading === titleSlug;

  const classForItem = {
    [styles['selected']]: selected,
    [styles['visible']]: false,
    [styles['separator']]: type === 'separator',
  };

  if (titleSlug == '/home' || route == '/') {
    return null;
  }

  return (
    <div className={cn(styles.nav_item, classForItem)}>
      <p>{pageTitle}</p>
    </div>
  );
};
