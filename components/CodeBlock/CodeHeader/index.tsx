import React, { FC } from 'react';
import cn from 'classnames';

import CopyToClipboard from '@/components/Buttons/CopyToClipboard';

import styles from './styles.module.scss';

interface ICodeHeader {
  filename?: string;
  method?: string | undefined;
  getValue(): string;
}

const CodeHeader: FC<ICodeHeader> = ({ filename, getValue, method }) => (
  <div className={cn(styles.codeHeader, { [styles.forMethod]: method })}>
    <div className={cn(styles.title, { [styles.forMethod]: method })}>
      {method && (
        <span
          className={cn(styles.title_method, { [styles[`${method}`]]: method })}
        >
          {method}
        </span>
      )}
      {filename}
    </div>
    <CopyToClipboard getValue={getValue} />
  </div>
);

export default CodeHeader;
