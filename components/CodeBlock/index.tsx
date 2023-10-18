import React, { FC, ReactNode, useRef, useState } from 'react';
import cn from 'classnames';
import { MDXProvider } from '@mdx-js/react';

import CodeHeader from '@/components/CodeBlock/CodeHeader';

import { ITab } from './utils/types';
import styles from './styles.module.scss';

interface ICodeBlock {
  filename?: string;
  hasCopyCode: boolean;
  children?: any;
  'data-language': string;
  tabs?: ITab[];
}

const CodeBlock: FC<ICodeBlock> = ({
  hasCopyCode,
  filename,
  children,
  tabs,
  ...props
}) => {
  const [activeTab, setActiveTab] = useState<null | number>(tabs ? 0 : null);
  const preRef = useRef<HTMLPreElement | null>(null);

  const getValue = () =>
    preRef.current?.querySelector('code')?.textContent || '';

  const isHeaderVisible = hasCopyCode || filename;

  const isShowSelect =
    !props['data-language'].includes('.') &&
    props['data-language'].split('.')[1] !== 'EMPTY';

  const Pre = ({ children }: { children: ReactNode; components?: any }) => (
    <pre
      className={cn(styles.pre, { [styles.withoutHeader]: !isHeaderVisible })}
      ref={preRef}
    >
      {children}
    </pre>
  );

  const Provider = tabs ? MDXProvider : Pre;

  const components = {
    pre: Pre as any,
  };

  const TabsContent = activeTab !== null && tabs?.[activeTab].content;
  const content = TabsContent ? <TabsContent /> : null;

  return (
    <div className={styles.codeBlockContainer}>
      {isHeaderVisible && (
        <CodeHeader
          filename={filename}
          getValue={getValue}
          isShowSelect={isShowSelect}
          tabs={tabs}
          setActiveTab={setActiveTab}
        />
      )}
      <Provider components={components}>{tabs ? content : children}</Provider>
    </div>
  );
};
export default CodeBlock;
