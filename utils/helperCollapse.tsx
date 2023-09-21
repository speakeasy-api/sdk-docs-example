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

export const items: CollapseProps['items'] = [
  {
    key: '1',
    label: (<CollapseLabel labelKey={'charge'} symbols={'?: '} value={'string'} />),
    children: (<CollapseChildren title={'The SetupIntent object for errors returned on a request involving a SetupIntent.'} itemsNest={getNestItems('1')} />),
  },
  {
    key: '2',
    label: (<CollapseLabel labelKey={'doc_url'} symbols={'?: '} value={'string'} />),
    children: (<CollapseChildren title={'The SetupIntent object for errors returned on a request involving a SetupIntent.'} itemsNest={getNestItems('2')} />),
  },
  {
    key: '3',
    label: (<CollapseLabel labelKey={'payment_method'} symbols={'?: '} value={'string'} />),
    children: (<CollapseChildren title={'The SetupIntent object for errors returned on a request involving a SetupIntent.'} itemsNest={getNestItems('3')} />),
  },
];
