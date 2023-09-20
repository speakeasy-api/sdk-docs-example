import {
  ReactNode,
  useContext,
  useEffect,
  useRef,
  createElement,
  FC,
} from 'react';

import { RouteContext, ScrollContext } from '@/components/scrollManager';

type textHeader = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

interface IHeaderProps {
  headingType: textHeader;
  children: ReactNode ;
}

const TextHeaderWrapper: FC<IHeaderProps> = ({ headingType, children }) => {
  const route = useContext(RouteContext);
  const scrollContent = useContext(ScrollContext);

  const inputRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (inputRef.current && (headingType === 'h1' || headingType === 'h2')) {
      scrollContent.upsertHeading(route, inputRef.current.offsetTop);
    }
  }, [inputRef.current?.offsetTop]);

  return createElement(headingType, {
    ref: inputRef,
    id: route,
  }, children);
};

export default TextHeaderWrapper;
