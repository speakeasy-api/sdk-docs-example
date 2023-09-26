import { CollapseProps } from 'antd';

import {
  CollapseChildren, CollapseLabel, NestHeading,
} from '@/components/CollapseParams';

export interface ICollapseLabelProps {
  nested?: boolean | undefined;
  labelKey?: string;
  symbols?: string;
  value?: string;
  order?: string[] | undefined;
  itemsNestContent?: ICollapseLabelProps[];
}

export interface ICollapseParams {
  items: CollapseProps['items'];
  nested?: boolean | undefined;
  isShowSubHeader?: boolean | undefined;
  fileNameAndCopyValue?: string | undefined;
  method?: string | undefined;
}

export interface ICollapseChildren {
  title: string;
  itemsNest: CollapseProps['items'];
}

const itemsNestContent: Record<string, ICollapseLabelProps[]> = {
  '1': [
    {
      labelKey: 'first_payment  ',
      symbols: '?:',
      value: 'string',
      order: ['symbols', 'key', 'value'],
    },
    {
      labelKey: 'first_payment',
      symbols: '?: ',
      value: 'string',
      order: ['key', 'symbols', 'value'],
    },
    {
      labelKey: 'first_payment',
      symbols: '?: ',
      value: 'string',
      order: ['key', 'symbols', 'value'],
    },
    {
      labelKey: 'first_payment  ',
      symbols: '?:',
      value: 'string',
      order: ['symbols', 'key', 'value'],
    },
    {
      labelKey: 'first_payment',
      symbols: '?: ',
      value: 'string',
      order: ['key', 'symbols', 'value'],
    },
    {
      labelKey: 'first_payment',
      symbols: '?: ',
      value: 'string',
      order: ['key', 'symbols', 'value'],
    },
    {
      labelKey: 'first_payment  ',
      symbols: '?:',
      value: 'string',
      order: ['symbols', 'key', 'value'],
    },
    {
      labelKey: 'first_payment',
      symbols: '?: ',
      value: 'string',
      order: ['key', 'symbols', 'value'],
    },
    {
      labelKey: 'first_payment',
      symbols: '?: ',
      value: 'string',
      order: ['key', 'symbols', 'value'],
    },
    {
      labelKey: 'first_payment  ',
      symbols: '?:',
      value: 'string',
      order: ['symbols', 'key', 'value'],
    },
    {
      labelKey: 'first_payment',
      symbols: '?: ',
      value: 'string',
      order: ['key', 'symbols', 'value'],
    },
    {
      labelKey: 'first_payment',
      symbols: '?: ',
      value: 'string',
      order: ['key', 'symbols', 'value'],
    },
  ],
  '2': [
    {
      labelKey: 'second_payment',
      symbols: '?: ',
      value: 'string',
      order: ['key', 'symbols', 'value'],
    },
    {
      labelKey: 'second_payment',
      symbols: '?: ',
      value: 'string',
      order: ['key', 'symbols', 'value'],
    },
    {
      labelKey: 'second_payment',
      symbols: '?: ',
      value: 'string',
      order: ['key', 'symbols', 'value'],
    },
  ],
  '3': [
    {
      labelKey: 'third_payment',
      symbols: '?: ',
      value: 'string',
      order: ['key', 'symbols', 'value'],
    },
    {
      labelKey: 'third_payment',
      symbols: '?: ',
      value: 'string',
      order: ['key', 'symbols', 'value'],
    },
    {
      labelKey: 'third_payment',
      symbols: '?: ',
      value: 'string',
      order: ['key', 'symbols', 'value'],
    },
  ],
};

const getNestItems = (nestKey: string) => [
  {
    key: nestKey,
    label: <NestHeading />,
    children: (
      <CollapseLabel
        nested
        itemsNestContent={itemsNestContent[nestKey]}
      />
    ),
  },
];

const itemsData: Record<string, string>[] = [
  {
    key: '1',
    labelKey: 'charge',
    symbols: '?: ',
    value: 'string',
    title:
      'The SetupIntent object for errors returned on a request involving a SetupIntent.',
  },
  {
    key: '2',
    labelKey: 'doc_url',
    symbols: '?: ',
    value: 'string',
    title: 'The SetupIntent object for errors',
  },
  {
    key: '3',
    labelKey: 'payment_method',
    symbols: '?: ',
    value: 'string',
    title: 'The SetupIntent',
  },
];

const prepareItems = (
  itemsData: Record<string, string>[],
): CollapseProps['items'] => itemsData.map((el: Record<string, string>) => ({
  key: el.key,
  label: (
    <CollapseLabel
      labelKey={el.labelKey}
      symbols={el.symbols}
      value={el.value}
    />
  ),
  children: (
    <CollapseChildren title={el.title} itemsNest={getNestItems(el.key)} />
  ),
}));

export const items = prepareItems(itemsData);
