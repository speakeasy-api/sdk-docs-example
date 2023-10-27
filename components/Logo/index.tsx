import React, { createRef, FC, useEffect } from 'react';

import Image from 'next/image';
import docsTheme from '@/theme.json';
import { useTheme } from 'next-themes';

const Logo: FC = () => {
  const { resolvedTheme } = useTheme();

  const darkSourceRef = createRef<HTMLSourceElement>();

  // This is necessary because of how Next handles images
  useEffect(() => {
    if (darkSourceRef.current) {
      darkSourceRef.current.media = resolvedTheme === 'dark' ? 'all' : 'none';
    }
  }, [resolvedTheme, darkSourceRef.current]);

  const logo = (
    <picture>
      <source
        ref={darkSourceRef}
        srcSet={docsTheme.logoDark}
        media='(prefers-color-scheme: dark)'
      />
      <Image src={docsTheme.logoLight} alt='Logo' width={125} height={50} />
    </picture>
  );

  return (
    <a
      href={docsTheme.logoLink}
      target={'_blank'}
      onClick={(e) => e.stopPropagation()}
    >
      {logo}
    </a>
  );
};

export default Logo;
