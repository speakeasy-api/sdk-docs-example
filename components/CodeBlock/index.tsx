import React, { FC, useRef } from 'react';
import cn from 'classnames';

import CodeHeader from '@/components/CodeBlock/CodeHeader';

import styles from './styles.module.scss';

interface ICodeBlock {
  filename?: string,
  hasCopyCode: boolean,
  children: any,
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

  return (
    <div className={styles.codeBlockContainer}>
      {isHeaderVisible && (
        <CodeHeader filename={filename} getValue={getValue} />
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
