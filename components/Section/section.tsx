import React, { ReactElement, useContext } from 'react';

import { RouteContext } from '../scrollManager';
import styles from './styles.module.scss';

export const DocsSection = ({
  route,
  children,
}: {
  route?: string;
  children?: ReactElement[];
}) => {
  let parentRoute = useContext(RouteContext);

  if (parentRoute === '/') {
    parentRoute = '';
  }

  if (route && route.startsWith('/')) {
    route = route.slice(1);
  }

  // Root page content needs a route to live in, so wrap it in /home
  const homeOverride = parentRoute === '' ? '/home' : '';
  // Then cut it out when pulling from children. But only when the route is only /{root}/home

  if (parentRoute.endsWith('/home') && parentRoute.split('/').length === 3) {
    parentRoute = parentRoute.slice(0, parentRoute.lastIndexOf('/home'));
  }

  return (
    <RouteContext.Provider
      value={`${parentRoute}/${route ?? ''}${homeOverride}`}
    >
      <div className={styles.container}>{children}</div>
    </RouteContext.Provider>
  );
};
