import React, { FC, useContext } from 'react';

import CopyToClipboard from '@/components/Buttons/CopyToClipboard';
import LanguageSelector from '@/components/LanguageSelector';
import { LanguageContext } from '@/utils/contexts/languageContext';

import styles from './styles.module.scss';

interface ICodeHeader {
  filename?: string,
  getValue(): string,
}

const CodeHeader: FC<ICodeHeader> = ({
  filename,
  getValue,
}) => {
  const { languageList } = useContext(LanguageContext);

  return (
    <div className={styles.codeHeader}>
      <div className={styles.title}>
        {filename}
      </div>
      <div className={styles.lastItems}>
        <LanguageSelector languageList={languageList} isSmall />
        <CopyToClipboard getValue={getValue} />
      </div>
    </div>
  );
};

export default CodeHeader;
