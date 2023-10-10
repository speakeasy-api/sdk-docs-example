import {
  ReactNode,
  useContext,
  useEffect,
  useRef,
  createElement,
  FC,
} from 'react';

import { RouteContext, ScrollContext } from '@/components/scrollManager';
import { LinkableContext } from '@/utils/contexts/linkableContext';
import { toRouteFormat } from '@/utils/routesHelpers';

type textHeader = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

interface IHeaderProps {
  headingType: textHeader;
  children: ReactNode ;
}

const TextHeaderWrapper: FC<IHeaderProps> = ({ headingType, children = '' }) => {
  const route = useContext(RouteContext);
  const scrollContext = useContext(ScrollContext);
  const linkable = useContext(LinkableContext);

  const headingValue = toRouteFormat(children?.toString());

  const inputRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (inputRef.current && linkable && (headingType === 'h1' || headingType === 'h2')) {
      scrollContext.upsertHeading(route, headingValue, inputRef.current, inputRef.current.offsetTop);
    }
  }, [inputRef.current?.offsetTop]);

  return createElement(headingType, {
    ref: inputRef,
    id: route,
  }, children);
};

export default TextHeaderWrapper;
