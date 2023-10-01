import { CollapseProps } from 'antd';

import {
  CollapseChildren, CollapseLabel, NestHeading,
} from '@/components/CollapseParams';

export interface IItemData {
  key: string;
  labelKey: string;
  symbols: string;
  value: string;
  title: string;
}

export interface IItemNestData {
  labelKey: string,
  symbols: string,
  value: string,
  order: string[],
}

export interface ICollapseLabelProps {
  nested?: boolean | undefined;
  labelKey?: string;
  symbols?: string;
  value?: string;
  order?: string[] | undefined;
  itemsNestContent?: ICollapseLabelProps[] | undefined;
}

export interface ICollapseParams {
  itemsNest?: CollapseProps['items'] | undefined;
  itemsData?: IItemData[];
  nested?: boolean | undefined;
  isShowSubHeader?: boolean | undefined;
  fileNameAndCopyValue?: string | undefined;
  method?: string | undefined;
  itemsNestData?: Record<string, IItemNestData[]> | undefined;
}

export interface ICollapseChildren {
  title: string;
  itemsNest: CollapseProps['items'];
}

const getNestItems = (nestKey: string, itemsNestData: Record<string, IItemNestData[]> | undefined) => [
  {
    key: nestKey,
    label: <NestHeading />,
    children: (
      <CollapseLabel nested itemsNestContent={itemsNestData && itemsNestData[nestKey]} />
    ),
  },
];

export const prepareItems = (
  itemsData: IItemData[] | undefined,
  itemsNestData: Record<string, IItemNestData[]> | undefined,
): CollapseProps['items'] => itemsData && itemsData.map((el: IItemData) => ({
  key: el.key,
  label: (
    <CollapseLabel
      labelKey={el.labelKey}
      symbols={el.symbols}
      value={el.value}
    />
  ),
  children: (
    <CollapseChildren
      title={el.title || ''}
      itemsNest={getNestItems(el.key, itemsNestData)}
    />
  ),
}));
