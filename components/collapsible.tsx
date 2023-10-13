import React, {
  FC, ReactNode, useEffect, useRef, useState, 
} from 'react';
import cn from 'classnames';

import RightArrow from '@/icons/RightArrow';

import styles from './styles.module.scss';

export type propsType = {
  children: ReactNode[];
  defaultOpen?: boolean;
  content?: () => Promise<any>;
};

export type BreakType = {
  Break: typeof Break;
};

const Collapsible: FC<propsType> & BreakType = (props: propsType) => {
  const headerHeight = 36;

  // const elements = props.children;
  const [isOpen, setIsOpen] = useState(props.defaultOpen ?? false);
  const [height, setHeight] = useState(headerHeight);
  const [ContentComponent, setContentComponent] = useState<any>(null);

  const headerRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  const heading = isOpen ? 'Hide child properties' : 'Show child properties';

  const updateOpenHeight = () => {
    setHeight(
      (headerRef.current?.offsetHeight || headerHeight) +
        (bodyRef.current?.getBoundingClientRect().height || 0),
    );
  };

  const open = () => {
    if (isOpen) {
      setHeight(headerHeight);
    } else {
      updateOpenHeight();
    }

    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    if (isOpen && props.content && !ContentComponent) {
      props.content()
        .then((module) => {
          setContentComponent(() => module.default);
        })
        .catch((error) => {
          console.error('Failed to load the content component', error);
        });
    }
  }, [isOpen, props.content, ContentComponent]);

  const dynamicChildren = isOpen && ContentComponent
    ? [<ContentComponent key="dynamicContentComponent" />]
    : [];

  const children = dynamicChildren.length > 0 ? dynamicChildren : props.children;

  useEffect(() => {
    if (isOpen) {
      // console.log('updating');
      updateOpenHeight();
    }
  }, [bodyRef.current]);

  return (
    <div className={styles.collapsible} style={{ height }}>
      <div
        ref={headerRef}
        onClick={open}
        className={styles.collapsible_heading}
      >
        <RightArrow activeClass={isOpen ? 'active' : ''} />
        <h5>{heading}</h5>
      </div>
      <div
        ref={bodyRef}
        className={cn(styles.collapsible_body, {
          [styles['collapsible_body_open']]: isOpen,
        })}
      >
        {children}
      </div>
    </div>
  );
};

const Break = () => <></>;

Collapsible.Break = Break;

export default Collapsible;