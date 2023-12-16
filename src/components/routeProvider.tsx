import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useRouter } from 'next/router';

type RouteProviderProps = {
  route: string;
  setRoute: (route: string) => void;
};
export const RouteContext = createContext<RouteProviderProps>({
  route: '/',
  setRoute: () => {},
});

export const useRoute = () => useContext(RouteContext).route;

export const RouteProvider = (props: { children: ReactNode }) => {
  const router = useRouter();
  const [route, setRoute] = useState('');

  useEffect(() => {
    setRoute(window.location.pathname);
  }, []);

  const handleRouteChange = (newRoute: string) => {
    const currentBasePage = route.split('/').at(1);

    // If we're on the same root page, just update the URL so that we don't have to reload the page
    if (newRoute.startsWith('/' + currentBasePage)) {
      updateUrlShallow(window, newRoute);
    } else {
      // This causes the page to reload
      router.push(newRoute, undefined, { scroll: false });
    }

    setRoute(newRoute);
  };

  return (
    <RouteContext.Provider value={{ route, setRoute: handleRouteChange }}>
      {props.children}
    </RouteContext.Provider>
  );
};

// We take in a window to ensure this is only called from where window is available
export const updateUrlShallow = (window: Window, url: string) => {
  window.history.replaceState(
    {
      ...window.history.state,
      as: url,
      url: url,
    },
    '',
    url,
  );
};
