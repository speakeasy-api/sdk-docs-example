import React, { FC, useRef } from 'react';
import cn from 'classnames';

import CodeHeader from '@/components/CodeBlock/CodeHeader';

import styles from './styles.module.scss';

interface ICodeBlock {
  filename?: string,
  hasCopyCode: boolean,
  children: any,
  'data-language': string
}

const CodeBlock: FC<ICodeBlock> = ({
  hasCopyCode,
  filename,
  children,
  ...props
}) => {
  const preRef = useRef<HTMLPreElement | null>(null);

  const getValue = () => preRef.current?.querySelector('code')?.textContent || '';

  const isHeaderVisible = hasCopyCode || filename;

  const isShowSelect = !props['data-language'].includes('.') && props['data-language'].split('.')[1] !== 'EMPTY';

  return (
    <div className={styles.codeBlockContainer}>
      {isHeaderVisible && (
        <CodeHeader filename={filename} getValue={getValue} isShowSelect={isShowSelect}/>
      )}
      <pre
        className={cn(styles.pre, { [styles.withoutHeader]: !isHeaderVisible })}
        ref={preRef}
        {...props}
      >
        {children}
      </pre>
    </div>
  );
};
export default CodeBlock;
