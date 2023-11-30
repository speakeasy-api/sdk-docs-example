import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { usePathname, useRouter } from 'next/navigation';

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
  scrollTo: (route: string) => void;
  setPage: (route: string) => void;
}>({
  headingToPosition: {},
  currentHeading: '',
  visibleHeadings: [],
  upsertHeading: () => {},
  scrollTo: () => {},
  setPage: () => {},
});

export const useSetPage = () => useContext(ScrollContext).setPage;

type HeadingPosition = {
  elem: HTMLHeadingElement;
  position: number;
};

// Used to change the route a bit before the heading is at the top of the page
const headingOffset = -200;

export const ScrollManager = (props: {
  children: ReactNode;
}): React.ReactElement => {
  const isMultipage = useContext(MultiPageContext);
  const pathname = usePathname();
  const slug = pathname !== null ? pathname : undefined;
  const router = useRouter();

  // useEffect(() => {
  //   console.log('slug', slug);
  // }, [slug]);

  const [initialScrollTarget, setInitialScrollTarget] = useState<string>();
  const [initialScrollDone, setInitialScrollDone] = useState(false);

  const rootPage = useMemo(
    () => (isMultipage ? slug?.split('/').at(1) ?? '' : ''),
    [slug],
  );

  const reset = () => {
    setHeadingToPosition({});
    setInitialScrollDone(false);
    setInitialScrollTarget(undefined);
  };

  // Reset state when the page changes
  // useEffect(() => {
  //   reset();
  // }, [rootPage]);

  const setPage = async (route: string) => {
    reset();
    await router.push(route, { scroll: false });
  };

  // useEffect(() => {
  //   console.log('initial', initialScrollTarget);
  // }, [initialScrollTarget]);

  const [headingToPosition, setHeadingToPosition] = useState<
    Record<string, HeadingPosition>
  >({});
  const upsertHeading = (
    route: string,
    heading: string,
    elem: HTMLHeadingElement,
    position: number,
  ) => {
    // console.log('got pos for heading', route, position);
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
    if (
      closestHeading &&
      initialScrollDone &&
      closestHeading.startsWith(`/${rootPage}`) // Make sure we haven't changed pages. Without this, we might overwrite the new route
    ) {
      router.push(closestHeading, { scroll: false });
    }
  }, [closestHeading]);

  // Scrolls the page to the location of the target heading
  const scrollTo = useMemo(
    () => (route: string) => {
      // console.log('trying scroll to', route, headingToPosition);

      if (headingToPosition[route]) {
        document.addEventListener(
          'scrollend',
          () => {
            setClosestHeading(route);
          },
          { once: true },
        );

        // console.log('scrolling to', route, headingToPosition[route]);

        // Scroll down a bit further than the heading so that it lines up right at the top
        window.scrollTo({ top: headingToPosition[route].position + 100 });
      }
    },
    [headingToPosition],
  );

  /**
   * On initial page load, set the heading to scroll to
   * This enables linking to a specific section
   * We don't want to run this every time the slug changes since we change it as the user scrolls
   */
  useEffect(() => {
    // At first, the slug is simply /[...rest], so wait til it properly pulls in the URL
    if (slug && !initialScrollTarget) {
      setInitialScrollTarget(slug);
    }
  }, [slug]);

  // Once the initial scroll target is set and we know where that heading is, scroll to it
  // Only do this once.
  useEffect(() => {
    if (
      !initialScrollDone &&
      initialScrollTarget &&
      headingToPosition[initialScrollTarget]
    ) {
      // console.log(
      //   'going to initial',
      //   initialScrollTarget,
      //   headingToPosition[initialScrollTarget],
      // );
      scrollTo(initialScrollTarget);
      setInitialScrollDone(true);
    }
  }, [initialScrollTarget, headingToPosition]);

  return (
    <ScrollContext.Provider
      value={{
        headingToPosition,
        upsertHeading,
        currentHeading: closestHeading,
        visibleHeadings,
        scrollTo,
        setPage,
      }}
    >
      {props.children}
    </ScrollContext.Provider>
  );
};
