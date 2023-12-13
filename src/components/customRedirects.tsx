import { useEffect } from 'react';
import { useRouter } from 'next/router';

type Redirect = {
  from: string;
  to: string;
};

export const CustomRedirects = () => {
  const router = useRouter();

  // Static redirects defined from theme.yaml
  const redirects: Redirect[] = [];

  useEffect(() => {
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
      router.push(newPath);
    }
  }, []);

  return null;
};
