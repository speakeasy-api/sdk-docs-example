import React, {
  ReactNode, useState, useEffect, 
} from 'react';

import RightArrow from '@/icons/RightArrow';

import styles from './styles.module.scss';
import { splitAround, typeMatches } from './typeHelpers';

type propsType = {
  children: ReactNode[];
  defaultOpen?: boolean;
  content?: () => Promise<any>;
};

export type BreakType = {
  Break: typeof Break;
};

const Collapsible: React.FC<propsType> & BreakType = (props: propsType) => {
  const { content, children } = props;
  const [isOpen, setIsOpen] = useState(!!props.defaultOpen);
  const [ContentComponent, setContentComponent] = useState<any>(null);

  useEffect(() => {
    if (isOpen && content && !ContentComponent) {
      content()
        .then((module) => {
          setContentComponent(() => module.default);
        })
        .catch((error) => {
          console.error('Failed to load the content component', error);
        });
    }
  }, [isOpen, content, ContentComponent]);

  const dynamicChildren = isOpen && ContentComponent
    ? [<ContentComponent key="dynamicContentComponent" />]
    : [];

  const allChildren = children
    ? [...children, ...dynamicChildren]
    : [...dynamicChildren];

  const [summarySection, bodySection] = allChildren && allChildren.length
    ? splitAround(allChildren, (e) => typeMatches(e, Break))
    : [[], []];

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