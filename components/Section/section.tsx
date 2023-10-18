import React, { ReactElement, useContext } from 'react';

import { MultiPageContext, RouteContext } from '../scrollManager';
import styles from './styles.module.scss';

export const DocsSection = ({
  route = '',
  children,
}: {
  route?: string;
  children?: ReactElement[];
}) => {
  let parentRoute = useContext(RouteContext);
  const isMultiPage = useContext(MultiPageContext);

  // if (parentRoute === '/') {
  //   parentRoute = '';
  // }
  //
  // if (route.startsWith('/')) {
  //   route = route.slice(1);
  // }

  let homeOverride = '';

  if (isMultiPage) {
    // Root page content needs a route to live in, so wrap it in /home
    if (parentRoute === '') {
      homeOverride = '/';
    }
  }

  let fullRoute = `${parentRoute}/${route}${homeOverride}`;
  fullRoute = fullRoute.replaceAll('//', '/');

  return (
    <RouteContext.Provider value={fullRoute}>
      <div className={styles.container}>{children}</div>
    </RouteContext.Provider>
  );
};
