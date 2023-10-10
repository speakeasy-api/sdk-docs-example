import React, {
  ReactNode, FC, useState, useEffect,
} from 'react';
import { Collapse } from 'antd';

import {
  convertData, convertNestData,
  ICollapseChildren,
  ICollapseLabelProps,
  ICollapseParams,
  IItemData,
} from '@/utils/helperCollapse';
import RightArrow from '@/icons/RightArrow';
import CodeHeader from '@/components/CodeBlock/CodeHeader';
import SubHeader from '@/components/CollapseParams/SubHeader';

export const NestHeading: FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <span className={'nested'} onClick={() => setIsOpen((prev) => !prev)}>
      {isOpen ? 'Hide' : 'Show'} child attributes
    </span>
  );
};

export const CollapseLabel: FC<ICollapseLabelProps> = (props): ReactNode => {
  const { nested, labelKey, symbols, order, value, itemsNestContent } = props;

  const [itemsNestContentLocal, setItemsNestContentLocal] = useState<IItemData[] | undefined>(itemsNestContent);
  const [searchValue, setSearchValue] = useState<string>('');

  useEffect(() => {
    setItemsNestContentLocal(itemsNestContent);
  }, [itemsNestContent]);

  const onSearchValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    const filteredItems =
      itemsNestContent &&
      [...itemsNestContent].filter(
        (item: IItemData) => (item.labelKey && item.labelKey.includes(e.target.value)) ||
          (item.value && item.value.includes(e.target.value)) ||
          (item.symbols && item.symbols.includes(e.target.value)),
      );
    setItemsNestContentLocal(filteredItems);
  };

  return (
    <>
      {itemsNestContent && itemsNestContent?.length ? (
        <>
          {itemsNestContent?.length >= 10 && (
            <SubHeader
              title={'Child attributes'}
              onChange={onSearchValueChange}
              value={searchValue}
              nested
              isShowSearchInput={itemsNestContent && itemsNestContent.length >= 10}
            />
          )}
          {/* eslint-disable-next-line no-prototype-builtins */}
          {itemsNestContentLocal && itemsNestContentLocal.some((el: IItemData) => el.hasOwnProperty('itemsChildrenData')) ? (
            <CollapseParams itemsData={itemsNestContentLocal} />
          ) : (itemsNestContentLocal && itemsNestContentLocal.map((el: IItemData, index: number) => (
            <div key={index}>
              <div className={'nested_params_box'}>
                <span className={'key'} style={{ order: el.order?.length ? el.order.indexOf('key') : 0 }}>
                  {el.labelKey}
                </span>
                <span className={'symbols'} style={{ order: el.order?.length ? el.order.indexOf('symbols') : 1 }}>
                  {el.symbols}
                </span>
                <span className={'value'} style={{ order: el.order?.length ? el.order.indexOf('value') : 2 }}>
                  {el.value}
                </span>
              </div>
              {nested && (<p className={'nested_desc'}>
                {el.title}
              </p>)}
            </div>))
          )}
        </>
      ) : (
        <>
          <div className={'nested_params_box'}>
            <span className={'key'} style={{ order: order?.length ? order.indexOf('key') : 0 }}>
              {labelKey}
            </span>
            <span className={'symbols'} style={{ order: order?.length ? order.indexOf('symbols') : 1 }}>
              {symbols}
            </span>
            <span className={'value'} style={{ order: order?.length ? order.indexOf('value') : 2 }}>
              {value}
            </span>
          </div>
        </>
      )}
    </>
  );
};

export const CollapseChildren: FC<ICollapseChildren> = (props) => {
  const { title, itemsNest } = props;

  return (
    <div className={'collapse_children'}>
      <p>{title}</p>
      <CollapseParams itemsNest={itemsNest} nested />
    </div>
  );
};

export const CollapseParams: FC<ICollapseParams> = (props) => {
  const {
    itemsNest,
    nested,
    fileNameAndCopyValue,
    method,
    isShowSubHeader,
    itemsData,
    defaultActiveKey,
  } = props;

  const [itemsDataLocal, setItemsDataLocal] = useState<IItemData[] | undefined>(itemsData);
  const [searchValue, setSearchValue] = useState<string>('');

  useEffect(() => {
    setItemsDataLocal(itemsData);
  }, [itemsData]);

  const onSearchValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    const filteredItems =
      itemsData &&
      [...itemsData].filter(
        (item: IItemData) => item.labelKey.includes(e.target.value) ||
          item.value.includes(e.target.value) ||
          item.symbols.includes(e.target.value),
      );
    setItemsDataLocal(filteredItems);
  };

  const separateParamsClass = !fileNameAndCopyValue && !isShowSubHeader ? 'withoutHeadings' : '';

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
          isShowSearchInput={itemsData && itemsData.length >= 10}
        />
      )}
      <Collapse
        defaultActiveKey={defaultActiveKey || []}
        destroyInactivePanel
        items={(itemsDataLocal && convertData(itemsDataLocal)) || (itemsNest && convertNestData(itemsNest))}
        ghost
        className={nested ? `Collapse_nest ${separateParamsClass}` : `Collapse ${separateParamsClass}`}
        expandIcon={({ isActive }) => (
          <RightArrow activeClass={isActive ? 'active' : ''} nested={nested} />
        )}
      />
    </div>
  );
};

export default CollapseParams;
