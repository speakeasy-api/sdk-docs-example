import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useRouter } from 'next/router';

export const MultiPageContext = createContext(false);
export const RouteContext = createContext('');
export const ScrollContext = createContext<{
  headingToPosition: Record<string, HeadingPosition>;
  currentHeading: string;
  visibleHeadings: string[];
  upsertHeading: (
    route: string,
    heading: string,
    elem: HTMLHeadingElement,
    position: number,
  ) => void;
}>({
  headingToPosition: {},
  currentHeading: '',
  visibleHeadings: [],
  upsertHeading: () => {},
});

type HeadingPosition = {
  elem: HTMLHeadingElement;
  position: number;
};

// Used to change the route a bit before the heading is at the top of the page
const headingOffset = -100;

export const ScrollManager = (props: {
  children: ReactNode;
}): React.ReactElement => {
  const isMultipage = useContext(MultiPageContext);
  const slug = useRouter().asPath;

  const rootPage = useMemo(
    () => (isMultipage ? slug.split('/').at(1) ?? '' : ''),
    [slug],
  );

  useEffect(() => {
    setHeadingToPosition({});
  }, [rootPage]);

  const [headingToPosition, setHeadingToPosition] = useState<
    Record<string, HeadingPosition>
  >({});
  const upsertHeading = (
    route: string,
    heading: string,
    elem: HTMLHeadingElement,
    position: number,
  ) => {
    setHeadingToPosition((currentValues) => {
      position = position + headingOffset;

      // If there are multiple headings in a section, we want to keep only the topmost one.
      // As a result, clicking the link in the sidebar will correctly scroll to the top of the section
      const current = currentValues[route];

      if (current && current.elem !== elem && position > current.position) {
        route += `#${heading}`;
      }

      return {
        ...currentValues,
        [route]: {
          elem,
          position,
        },
      };
    });
  };

  const [closestHeading, setClosestHeading] = useState<string>('/' + rootPage);
  const [visibleHeadings, setVisibleHeadings] = useState<string[]>([
    closestHeading,
  ]);

  /**
   * This is responsible for setting the route in the URL to the closest heading when the user scrolls.
   * This is memoized so that it can be removed when the route changes (otherwise it prevents scrolling to the desired heading)
   */
  const scroll = useMemo(
    () => () => {
      const entries = Object.entries(headingToPosition);

      const visible = entries
        .filter(
          ([_, { position }]) =>
            window.scrollY < position &&
            position < window.scrollY + window.innerHeight,
        )
        .map(([route]) => route);

      // Find the first heading that is below the current scroll position
      const nextIndex = entries.findIndex(
        ([_, { position }]) => position > window.scrollY,
      );

      // The current heading is the one before that
      const currentIndex =
        nextIndex === -1
          ? entries.length - 1
          : nextIndex - 1 >= 0
          ? nextIndex - 1
          : 0;
      const closest = entries[currentIndex]?.[0];

      setClosestHeading(closest);
      setVisibleHeadings([closest, ...visible]);
    },
    [headingToPosition],
  );

  useEffect(() => {
    window.addEventListener('scroll', scroll, false);

    return () => window.removeEventListener('scroll', scroll, false);
  }, [scroll]);

  useEffect(() => {
    window.history.replaceState(
      { ...window.history },
      'ignored',
      closestHeading,
    );
  }, [closestHeading]);

  /**
   * This is responsible for scrolling to the relevant heading when the route in the URL changes
   */
  useEffect(() => {
    if (slug !== closestHeading && headingToPosition[slug]) {
      document.addEventListener(
        'scrollend',
        () => {
          setClosestHeading(slug);
        },
        { once: true },
      );

      window.scrollTo({ top: headingToPosition[slug].position });
    }
  }, [slug]);

  return (
    <ScrollContext.Provider
      value={{
        headingToPosition,
        upsertHeading,
        currentHeading: closestHeading,
        visibleHeadings,
      }}
    >
      {props.children}
    </ScrollContext.Provider>
  );
};
