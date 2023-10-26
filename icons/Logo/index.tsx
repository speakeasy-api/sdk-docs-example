import React, { FC } from 'react';

import Image from 'next/image';
import docsTheme from '@/theme.json';
import { useTheme } from 'next-themes';

const Logo: FC = () => {
  const { theme } = useTheme();

  const src = theme === 'dark' ? docsTheme.logoDark : docsTheme.logoLight;

  return (
    <a
      href={docsTheme.logoLink}
      target={'_blank'}
      onClick={(e) => e.stopPropagation()}
    >
      <Image src={src} alt={'Logo'} width={125} height={50} />
    </a>
  );
};

export default Logo;
