import React, {
  ReactNode, Children, useState,
} from 'react';

type propsType = {
  children?: ReactNode[]
};

const Collapsible: React.FC<propsType> = (props: propsType) => {
  const elements = Children.toArray(props.children).filter((child) => child !== '\n');

  const first = elements.shift();
  const firstChildren = (first as any).props?.children;
  const isCollapsible = typeof firstChildren === 'string' && firstChildren.startsWith('collapse');

  if (!isCollapsible) {
    return <blockquote>{props.children}</blockquote>;
  }

  const config = firstChildren.split(' ');
  const defaultOpen = config.includes('open');

  const newChildren = elements.pop();
  const [isOpen, setIsOpen] = useState<boolean>(defaultOpen);

  return <div style={{ border: '1px solid green' }}>
    <div onClick={() => setIsOpen((prev) => !prev)}>{elements}{isOpen ? '-' : '+'}</div>
    {isOpen && <div style={{ padding: '8px' }}>{newChildren}</div>}
  </div>;
};

export default Collapsible;
