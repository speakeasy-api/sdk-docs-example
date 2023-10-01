import React, { FC, useContext } from 'react';
import cn from 'classnames';

import CopyToClipboard from '@/components/Buttons/CopyToClipboard';
import LanguageSelector from '@/components/LanguageSelector';
import { LanguageContext } from '@/utils/contexts/languageContext';

import styles from './styles.module.scss';

interface ICodeHeader {
  filename?: string;
  method?: string | undefined;
  isShowSelect?: boolean | undefined;
  getValue(): string;
}

const CodeHeader: FC<ICodeHeader> = ({ filename, getValue, method, isShowSelect }) => {
  const { languageList } = useContext(LanguageContext);

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
        {filename}
      </div>
      <div className={styles.lastItems}>
        {isShowSelect && <LanguageSelector languageList={languageList} isSmall />}
        <CopyToClipboard getValue={getValue} />
      </div>
    </div>
  );
};

export default CodeHeader;
