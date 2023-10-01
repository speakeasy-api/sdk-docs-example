import React, { FC } from 'react';
import { Input } from 'antd';

import Search from '@/icons/Search';

import styles from './styles.module.scss';

const SubHeader: FC<{
  title: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
}> = ({ title, onChange, value }) => (
  <div className={styles.sub_header}>
    <p>{title}</p>
    <Input
      className={styles.sub_header_search}
      onChange={onChange}
      value={value}
      size='large'
      placeholder='Search parameters...'
      prefix={<Search />}
    />
  </div>
);

export default SubHeader;
