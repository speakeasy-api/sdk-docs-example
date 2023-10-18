import React from 'react';

import {
  CollapseChildren,
  CollapseLabel,
  NestHeading,
} from '@/components/CollapseParams';

export interface IItemData {
  key: string;
  labelKey: string;
  symbols: string;
  value: string;
  title: string;
  order?: string[];
  itemsChildrenData?: IItemData[];
}

export interface ICollapseLabelProps {
  nested?: boolean | undefined;
  labelKey?: string;
  symbols?: string;
  value?: string;
  order?: string[] | undefined;
  itemsNestContent?: IItemData[] | undefined;
}

export interface ICollapseParams {
  itemsNest?: IItemData[] | undefined;
  nested?: boolean | undefined;
  fileNameAndCopyValue?: string | undefined;
  method?: string | undefined;
  isShowSubHeader?: boolean | undefined;
  itemsData?: IItemData[];
  defaultActiveKey?: string[] | undefined;
}

export interface ICollapseChildren {
  title: string;
  itemsNest: IItemData[];
}

export const convertData = (data: IItemData[]) =>
  data.map((item: IItemData) => ({
    key: item.key,
    label: (
      <CollapseLabel
        labelKey={item.labelKey}
        symbols={item.symbols}
        value={item.value}
      />
    ),
    children: item.itemsChildrenData ? (
      <CollapseChildren
        title={item.title || ''}
        itemsNest={item.itemsChildrenData}
      />
    ) : (
      <p className={'nested_desc'}>{item.title}</p>
    ),
  }));

export const convertNestData = (nestData: IItemData[]) => [
  {
    key: '123',
    label: <NestHeading />,
    children: <CollapseLabel itemsNestContent={nestData} nested />,
  },
];
