import React, {
  ReactNode,
  useEffect,
  useMemo,
  useState,
  createContext,
} from 'react';
import { useRouter } from 'next/router';

export const RouteContext = createContext('');
export const ScrollContext = createContext<{
  headingToPosition: Record<string, number>,
  currentHeading: string,
  upsertHeading: (heading: string, position: number) => void
}>({
      headingToPosition: {},
      currentHeading: '',
      upsertHeading: () => {},
    });

export const ScrollManager = (props: { children: ReactNode }): React.ReactElement => {
  const slug = useRouter().asPath;

  const [headingToPosition, setHeadingToPosition] = useState<Record<string, number>>({});
  const upsertHeading = (heading: string, position: number) => {
    const offset = -100;
    setHeadingToPosition((current) => ({ ...current,
      [heading]: position + offset }));
  };

  const [closestHeading, setClosestHeading] = useState<string>('/');
  /**
     * This is responsible for setting the route in the URL to the closest heading when the user scrolls.
     * This is memoized so that it can be removed when the route changes (otherwise it prevents scrolling to the desired heading)
  **/

  const scroll = useMemo(() => () => {
    const proximity = (pagePos: number) => Math.abs(window.scrollY - pagePos);
    const closest: string | undefined = Object.entries(headingToPosition)
      .sort((a, b) => proximity(a[1]) - proximity(b[1]))
      .at(0)?.[0];

    closest && setClosestHeading(closest);
  }, [headingToPosition]);

  useEffect(() => {
    window.addEventListener('scroll', scroll, false);

    return () => window.removeEventListener('scroll', scroll, false);
  }, [scroll]);

  useEffect(() => {
    window.history.replaceState({ ...window.history }, closestHeading, closestHeading);
  }, [closestHeading]);

  /**
     * This is responsible for scrolling to the relevant heading when the route in the URL changes
  */
  useEffect(() => {
    if (slug !== closestHeading) {
      document.addEventListener('scrollend', () => {
        setClosestHeading(slug);
      }, { once: true });

      window.scrollTo({ top: headingToPosition[slug] });
    }
  }, [slug]);

  return <ScrollContext.Provider
    value={{
      headingToPosition,
      upsertHeading,
      currentHeading: closestHeading,
    }}>{ props.children }</ScrollContext.Provider>;
};
