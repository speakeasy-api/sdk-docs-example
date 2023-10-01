import React, { ReactElement, ReactNode } from 'react';

import { splitByType } from './typeHelpers';

type propsType = {
  children: ReactElement[] | ReactElement | undefined;
};

export const Columns: React.FC<propsType> & { RHS: typeof RHS } = (
  props: propsType,
) => {
  const [rhs, lhs] = splitByType(props.children, RHS);
  const mainContent = lhs.length || rhs.length ? lhs : props.children;

  const columns = (
    <div style={{
      display: 'flex',
      width: '1200px',
      gap: '15px',
      alignItems: 'flex-end',
    }}>
      <div style={{ flex: 1 }}>{mainContent}</div>
      <div style={{ flex: 1 }}>{rhs}</div>
    </div>
  );

  return <div>{rhs.length > 0 ? columns : mainContent}</div>;
};

export const RHS = (props: { children: ReactNode }) => <>{props.children}</>;

Columns.RHS = RHS;

export default Columns;
