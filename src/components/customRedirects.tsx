import { useLayoutEffect } from 'react';
import { useRouter } from 'next/router';
import { Languages } from '@/content/languages';

type Redirect = {
  from: string;
  to: string;
};

export const CustomRedirects = () => {
  const router = useRouter();

  // Static redirects defined from theme.yaml
  const redirects: Redirect[] = [
    {
      from: '/',
      to: `/${Languages[0]}/client_sdks/`,
    },
    ...Languages.map((lang) => ({
      from: `/${lang}`,
      to: `/${lang}/client_sdks/`,
    })),
  ];

  useLayoutEffect( () => {
    const currentPath = window.location.pathname;
    console.log('CustomRedirects', currentPath, redirects);

    const matchedRedirect = redirects.find((r) => {
      if (!r.from.endsWith('*')) {
        return r.from === currentPath;
      }

      const basePath = r.from.replace('*', '');

      return currentPath.startsWith(basePath);
    });

    console.log('matchedRedirect', matchedRedirect);

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
