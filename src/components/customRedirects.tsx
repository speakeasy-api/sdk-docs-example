import { useLayoutEffect } from 'react';
import { useRouter } from 'next/router';

type Redirect = {
  from: string;
  to: string;
};

export const CustomRedirects = () => {
  const router = useRouter();

  // Static redirects defined from theme.yaml
  const redirects: Redirect[] = [
    { from: '/', to: '/go/client_sdks/' },
    { from: '/go', to: '/go/client_sdks/' },
    { from: '/typescript', to: '/typescript/client_sdks/' },
    { from: '/python', to: '/python/client_sdks/' },
    { from: '/java', to: '/java/client_sdks/' },
    { from: '/csharp', to: '/csharp/client_sdks/' },
    { from: '/unity', to: '/unity/client_sdks/' },
    { from: '/curl', to: '/curl/client_sdks/' },
  ];

  useLayoutEffect(() => {
    const currentPath = window.location.pathname;

    const matchedRedirect = redirects.find((r) => {
      if (!r.from.endsWith('*')) {
        return r.from === currentPath;
      }

      const basePath = r.from.replace('*', '');

      return currentPath.startsWith(basePath);
    });

    if (matchedRedirect) {
      const newPath = matchedRedirect.from.endsWith('*')
        ? matchedRedirect.to.replace('*', '') +
          currentPath.replace(matchedRedirect.from.replace('*', ''), '')
        : matchedRedirect.to;

      router.replace(newPath);
    }
  }, []);

  return null;
};
