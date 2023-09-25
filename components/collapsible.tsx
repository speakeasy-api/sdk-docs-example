import React, {
  ReactNode,
  useState,
  FC,
} from 'react';

import RightArrow from '@/icons/RightArrow';

import styles from './styles.module.scss';
import { splitAround, typeMatches } from './typeHelpers';

type propsType = {
  children: ReactNode[];
  defaultOpen?: boolean;
};

const Collapsible: FC<propsType> & { Break: typeof Break } = (props: propsType) => {
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
