import React, { ReactElement, ReactNode } from 'react';
import { splitByType } from './typeHelpers';

type propsType = {
    children: ReactElement[]
}

export const Columns: React.FC<propsType> & { RHS: typeof RHS } = (props: propsType) => {
    const [rhs, lhs] = splitByType(props.children, RHS);
    const mainContent = lhs.length || rhs.length ? lhs : props.children;

    const columns = <div style={{ display: 'flex', width: '1200px' }}>
        <div style={{ flex: 1 }}>
            {mainContent}
        </div>
        <div style={{ flex: 1 }}>
            {rhs}
        </div>
    </div>;

    return <div style={{
        margin: '48px 0px',
        borderTop: '1px solid black',
        borderBottom: '1px solid black',
        width: '600px',
        overflow: 'visible',
    }}>
        {rhs.length > 0 ? columns : mainContent}
    </div>;
};

export const RHS = (props: { children: ReactNode }) => {
    return <>{props.children}</>;
};

Columns.RHS = RHS;

export default Columns;