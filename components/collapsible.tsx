import React, {
  ReactNode,
  useState,
  FC,
} from 'react';

import RightArrow from '@/icons/RightArrow';

import styles from './styles.module.scss';
import { splitAround, typeMatches } from './typeHelpers';

export type propsType = {
  children: ReactNode[];
  defaultOpen?: boolean;
};

export type BreakType = {
  Break: typeof Break;
};

const Collapsible: FC<propsType> & BreakType = (props: propsType) => {
  const elements = props.children;
  const [isOpen, setIsOpen] = useState(!!props.defaultOpen);

  const [summarySection, bodySection] = splitAround(elements, (e) => typeMatches(e, Break));

  return (
    <div className={styles.collapsible}>
      <div onClick={() => setIsOpen((prev) => !prev)} className={styles.collapsible_heading}>
        <RightArrow activeClass={isOpen ? 'active' : ''}/>
        {summarySection}
      </div>
      {isOpen && <div className={styles.collapsible_nested}>{bodySection}</div>}
    </div>
  );
};

const Break = () => <></>;

Collapsible.Break = Break;

export default Collapsible;
