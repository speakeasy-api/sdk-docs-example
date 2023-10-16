import React, { FC, ReactNode, useCallback, useEffect, useState } from 'react';

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
  const headerDefaultHeight = 36;

  // const elements = props.children;
  const [isOpen, setIsOpen] = useState(props.defaultOpen ?? false);
  const [height, setHeight] = useState(headerDefaultHeight);
  const [ContentComponent, setContentComponent] = useState<any>(null);
  const [shouldTransitionHeight, setShouldTransitionHeight] = useState(false);

  const [headerRef, headerHeight] = useRefWithHeight();
  const [bodyRef, bodyHeight] = useRefWithHeight();

  const heading = isOpen ? 'Hide child properties' : 'Show child properties';

  const updateOpenHeight = (shouldTransition: boolean) => {
    setHeight((headerHeight || headerDefaultHeight) + (bodyHeight || 0));
    setShouldTransitionHeight(shouldTransition);
  };

  const open = () => {
    if (isOpen) {
      setShouldTransitionHeight(true);
      setHeight(headerHeight);
    } else {
      updateOpenHeight(true);
    }

    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    if (isOpen) {
      updateOpenHeight(false);
    }
  }, [bodyHeight, ContentComponent]);

  useEffect(() => {
    if (isOpen && props.content && !ContentComponent) {
      props
        .content()
        .then((module) => {
          setContentComponent(() => module.default);
        })
        .catch((error) => {
          console.error('Failed to load the content component', error);
        });
    }
  }, [isOpen, props.content, ContentComponent]);

  const dynamicChildren =
    isOpen && ContentComponent
      ? [<ContentComponent key='dynamicContentComponent' />]
      : [];

  const existingChildren = props.children ? props.children : [];

  const children =
    dynamicChildren.length > 0
      ? [...existingChildren, ...dynamicChildren]
      : existingChildren;

  return (
    <div
      className={styles.collapsible}
      style={{
        height,
        ...(shouldTransitionHeight && { transition: 'height 0.5s ease' }),
      }}
    >
      <div
        ref={headerRef}
        onClick={open}
        className={styles.collapsible_heading}
      >
        <RightArrow activeClass={isOpen ? 'active' : ''} />
        <h5>{heading}</h5>
      </div>
      <div ref={bodyRef} className={styles.collapsible_body}>
        {children}
      </div>
    </div>
  );
};

const useRefWithHeight = (): [(ref: HTMLDivElement) => void, number] => {
  const [height, setHeight] = useState(0);
  const ref = useCallback((node: HTMLDivElement) => {
    if (node !== null) {
      setHeight(node.getBoundingClientRect().height);

      const resizeObserver = new ResizeObserver((entries) => {
        for (const entry of entries) {
          setHeight(entry.target.getBoundingClientRect().height);
        }
      });

      resizeObserver.observe(node);
    }
  }, []);

  return [ref, height];
};
const Break = () => <></>;

Collapsible.Break = Break;

export default Collapsible;
