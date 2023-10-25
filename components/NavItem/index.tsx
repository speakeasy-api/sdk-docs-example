import React, { FC, useContext } from 'react';
import cn from 'classnames';

import { toRouteFormat } from '@/utils/routesHelpers';

import styles from './styles.module.scss';

import { ScrollContext } from '../scrollManager';
import { getAllPages } from 'nextra/context';

export const NavItem: FC<Record<string, string>> = ({ route, title, type }) => {
  const pages = getAllPages();
  const { currentHeading, visibleHeadings, scrollTo } =
    useContext(ScrollContext);

  const pageTitle = title.split('/').pop();

  const titleSlug = '/' + toRouteFormat(title.toLowerCase());

  const baseCurrentHeading = currentHeading?.split('#')[0];
  const headings = visibleHeadings.map((heading) => heading?.split('#')[0]);

  const selected = baseCurrentHeading === titleSlug;

  // console.log(titleSlug, route)

  const classForItem = {
    [styles['selected']]: selected,
    [styles['visible']]: false,
    [styles['separator']]: type === 'separator',
  };

  if (titleSlug == '/home' || route == '/') {
    return null;
  }

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        scrollTo(titleSlug);
      }}
      className={cn(styles.nav_item, classForItem)}
    >
      <p>{pageTitle}</p>
    </div>
  );
};
