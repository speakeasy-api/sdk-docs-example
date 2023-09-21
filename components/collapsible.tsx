import React, {
  ReactNode, useState,
} from 'react';

import styles from './styles.module.scss';
import RightArrow from '@/icons/RightArrow';

type propsType = {
  children: ReactNode[];
  defaultOpen?: boolean;
};

const Collapsible: React.FC<propsType> & { Break: typeof Break } = (
  props: propsType,
) => {
  const elements = props.children;

  const isBreak = (e: any) => {
    const isFn = e.type && typeof e.type === 'function';

    return isFn && e.type().props?.children === 'collapsible-break';
  };

  const breakIndex = elements.findIndex((e) => isBreak(e));

  if (breakIndex === -1) {
    return <div>{elements}</div>;
  }

  const summarySection = elements.slice(0, breakIndex);
  const bodySection = elements.slice(breakIndex + 1);

  const [isOpen, setIsOpen] = useState(!!props.defaultOpen);

  return (
    <div className={styles.collapsible}>
      <div onClick={() => setIsOpen((prev) => !prev)} className={styles.collapsible_heading}>
        <RightArrow activeClass={isOpen ? 'active' : ''} />
        {summarySection}
      </div>
      {isOpen && <div className={styles.collapsible_nested}>{bodySection}</div>}
    </div>
  );
};

const Break = () => <div>collapsible-break</div>;

Collapsible.Break = Break;

export default Collapsible;
