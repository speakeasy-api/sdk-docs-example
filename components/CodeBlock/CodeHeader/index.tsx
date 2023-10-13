import React, { FC } from 'react';
import cn from 'classnames';
import { Tabs } from 'antd';

import CopyToClipboard from '@/components/Buttons/CopyToClipboard';
import LanguageSelector from '@/components/LanguageSelector';

import styles from './styles.module.scss';

import { ITab } from '../utils/types';

interface ICodeHeader {
  filename?: string;
  method?: string | undefined;
  isShowSelect?: boolean | undefined;

  getValue(): string;

  tabs?: ITab[];
  setActiveTab?: (number: number) => void;
}

const CodeHeader: FC<ICodeHeader> = ({
  filename,
  getValue,
  method,
  isShowSelect,
  tabs,
  setActiveTab,
}) => {
  const onChangeTabs = (key: string) =>
    setActiveTab && setActiveTab(Number(key));

  return (
    <div className={cn(styles.codeHeader, { [styles.forMethod]: method })}>
      <div className={cn(styles.title, { [styles.forMethod]: method })}>
        {method && (
          <span
            className={cn(styles.title_method, {
              [styles[`${method}`]]: method,
            })}
          >
            {method}
          </span>
        )}
        {!tabs && filename}
        {tabs && (
          <Tabs defaultActiveKey='0' items={tabs} onChange={onChangeTabs} />
        )}
      </div>
      <div className={styles.lastItems}>
        {isShowSelect && <LanguageSelector style={'small'} />}
        <CopyToClipboard getValue={getValue} />
      </div>
    </div>
  );
};

export default CodeHeader;
