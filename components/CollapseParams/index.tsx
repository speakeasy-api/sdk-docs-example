import React, {
  ReactNode, FC, useState,
} from 'react';
import { Collapse } from 'antd';

import {
  ICollapseChildren, ICollapseLabelProps, ICollapseParams,
} from '@/utils/helperCollapse';
import RightArrow from '@/icons/RightArrow';

export const NestHeading: FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return <span className={'nested'} onClick={() => setIsOpen(!isOpen)}>{isOpen ? 'Hide' : 'Show'} child attributes</span>;
};

export const CollapseLabel: FC<ICollapseLabelProps> = (props): ReactNode => {
  const { nested, labelKey, symbols, order, value, itemsNestContent } = props;

  return (
    <>
      {itemsNestContent && itemsNestContent?.length ? (
        itemsNestContent.map((el: ICollapseLabelProps, index: number) => (
          <div key={index}>
            <div className={'nested_params_box'}>
              <span className={'key'} style={{ order: el.order?.length ? el.order.indexOf('key') : 0 }}>{el.labelKey}</span>
              <span className={'symbols'} style={{ order: el.order?.length ? el.order.indexOf('symbols') : 1 }}>{el.symbols}</span>
              <span className={'value'} style={{ order: el.order?.length ? el.order.indexOf('value') : 2 }}>{el.value}</span>
            </div>
            {nested && <p className={'nested_desc'}>Unique identifier for the object.</p>}
          </div>
        ))
      ) : (
        <>
          <div className={'nested_params_box'}>
            <span className={'key'} style={{ order: order?.length ? order.indexOf('key') : 0 }}>{labelKey}</span>
            <span className={'symbols'} style={{ order: order?.length ? order.indexOf('symbols') : 1 }}>{symbols}</span>
            <span className={'value'} style={{ order: order?.length ? order.indexOf('value') : 2 }}>{value}</span>
          </div>
          {nested && <p className={'nested_desc'}>Unique identifier for the object.</p>}
        </>
      )}
    </>
  );
};

export const CollapseChildren: FC<ICollapseChildren> = (props) => {
  const { title, itemsNest } = props;

  return <div className={'collapse_children'}>
    <p>{title}</p>
    <CollapseParams items={itemsNest} nested/>
  </div>;
};

export const CollapseParams: FC<ICollapseParams> = (props) => {
  const { items, nested } = props;

  return (
    <Collapse
      items={items}
      ghost
      className={nested ? 'Collapse_nest' : 'Collapse'}
      expandIcon={({ isActive }) => <RightArrow activeClass={isActive ? 'active' : ''} nested/>}
    />
  );
};

export default CollapseParams;
