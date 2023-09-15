
import {
  ReactNode,
  useContext,
  useEffect,
  useRef,
  createElement,
} from 'react';

import { RouteContext, ScrollContext } from './scrollManager';

export const Header = (headingType: string) => (props: { children: ReactNode }) => {
  const route = useContext(RouteContext);
  const scrollContent = useContext(ScrollContext);

  const inputRef = useRef<HTMLHeadingElement>();

    useEffect(() => {
    if (inputRef?.current) {
      scrollContent.upsertHeading(route, inputRef.current.offsetTop);
    }
    }, [inputRef.current?.offsetTop]);

  return (
    createElement(headingType, {
      ref: inputRef,
      id: route,
      style: { fontSize: '32px' },
    }, props.children)
  );
};
