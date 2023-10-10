import React, { FC } from 'react';
import { Input } from 'antd';
import cn from 'classnames';

import Search from '@/icons/Search';

import styles from './styles.module.scss';

const SubHeader: FC<{
  title: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  nested?: boolean;
  isShowSearchInput?: boolean;
}> = ({ title, onChange, value, nested, isShowSearchInput }) => (
  <div className={cn(styles.sub_header, { [styles.nested]: nested })}>
    <p>{title}</p>
    {isShowSearchInput && <Input
      className={styles.sub_header_search}
      onChange={onChange}
      value={value}
      size='large'
      placeholder='Search parameters...'
      prefix={<Search />}
    />}
  </div>
);

export default SubHeader;
