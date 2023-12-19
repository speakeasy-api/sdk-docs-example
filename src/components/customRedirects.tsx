import { useLayoutEffect } from 'react';
import { useRouter } from 'next/router';
import { Languages, DefaultLanguage } from '@/content/languages';

type Redirect = {
  from: string;
  to: string;
};

export const CustomRedirects = () => {
  const router = useRouter();

  // Static redirects + custom redirects defined in theme.yaml
  const redirects: Redirect[] = [
    {
      from: '/',
      to: `/${DefaultLanguage}/client_sdks/`,
    },
    ...Languages.map((lang) => ({
      from: `/${lang}`,
      to: `/${lang}/client_sdks/`,
    })),
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
