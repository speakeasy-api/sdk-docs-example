import { ReactNode, useContext } from 'react';

import { RouteContext } from './scrollHelpers';

export const DocsSection = (props: {
  route?: string,
  children?: ReactNode
}) => {
  let parentRoute = useContext(RouteContext);

  if (parentRoute === '/') {
    parentRoute = '';
  }

  return <RouteContext.Provider value={`${parentRoute}/${props.route ?? ''}`}>
    <div>
      {props.children}
    </div>
  </RouteContext.Provider>;
};
