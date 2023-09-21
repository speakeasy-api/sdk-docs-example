import React, { FC } from 'react';

import CopyToClipboard from '@/components/Buttons/CopyToClipboard';

import styles from './styles.module.scss';

interface ICodeHeader {
  filename?: string,
  getValue(): string,
}

const CodeHeader: FC<ICodeHeader> = ({
  filename,
  getValue,
}) => (
  <div className={styles.codeHeader}>
    <div className={styles.title}>
      {filename}
    </div>
    <CopyToClipboard getValue={getValue} />
  </div>
);

export default CodeHeader;
