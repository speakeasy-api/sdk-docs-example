import React, {
  ReactNode, FC, useState, useEffect,
} from 'react';
import { Collapse } from 'antd';

import {
  ICollapseChildren, ICollapseLabelProps, ICollapseParams, IItemData, prepareItems,
} from '@/utils/helperCollapse';
import RightArrow from '@/icons/RightArrow';
import CodeHeader from '@/components/CodeBlock/CodeHeader';
import SubHeader from '@/components/CollapseParams/SubHeader';

export const NestHeading: FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return <span className={'nested'} onClick={() => setIsOpen((prev) => !prev)}>{isOpen ? 'Hide' : 'Show'} child attributes</span>;
};

export const CollapseLabel: FC<ICollapseLabelProps> = (props): ReactNode => {
  const { nested, labelKey, symbols, order, value, itemsNestContent } = props;

  return (
    <>
      {itemsNestContent && itemsNestContent?.length ? (
        itemsNestContent.map((el: any, index: number) => (
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
    <CollapseParams itemsNest={itemsNest} nested />
  </div>;
};

export const CollapseParams: FC<ICollapseParams> = (props) => {
  const { itemsNestData, itemsNest, nested, fileNameAndCopyValue, method, isShowSubHeader, itemsData } = props;

  const [itemsDataLocal, setItemsDataLocal] = useState<IItemData[] | undefined>(itemsData);
  const [searchValue, setSearchValue] = useState<string>('');

  useEffect(() => {
    setItemsDataLocal(itemsData);
  }, [itemsData]);

  const onSearchValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    const filteredItems = itemsData && [...itemsData].filter(
      (item: IItemData) => item.labelKey.includes(e.target.value) ||
        item.value.includes(e.target.value) ||
        item.symbols.includes(e.target.value),
    );
    setItemsDataLocal(filteredItems);
  };

  return (
    <div>
      {fileNameAndCopyValue && (
        <CodeHeader
          filename={fileNameAndCopyValue}
          getValue={() => fileNameAndCopyValue}
          method={method?.toUpperCase()}
          isShowSelect={true}
        />
      )}
      {isShowSubHeader && (
        <SubHeader
          title={'Parameters'}
          onChange={onSearchValueChange}
          value={searchValue}
        />
      )}
      {itemsDataLocal && itemsDataLocal?.length === 0 ? (
        <p className={'Collapse'}>No results found</p>
      ) : (
        <Collapse
          items={itemsNest || itemsNestData && prepareItems(itemsDataLocal, itemsNestData)}
          ghost
          className={nested ? 'Collapse_nest' : 'Collapse'}
          expandIcon={({ isActive }) => (
            <RightArrow
              activeClass={isActive ? 'active' : ''}
              nested={nested}
            />
          )}
        />
      )}
    </div>
  );
};

export default CollapseParams;
