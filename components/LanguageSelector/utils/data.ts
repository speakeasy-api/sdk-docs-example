import React from 'react';

import TypeScript from '@/icons/TypeScript';
import { Language } from '@/content/languages';
import Go from '@/icons/Go';

type languageInfo = {
  title: string;
  Icon: React.FC;
};

export const languageData: Record<Language, languageInfo> = {
  typescript: {
    title: 'TypeScript',
    Icon: TypeScript,
  },
  go: {
    title: 'Go',
    Icon: Go,
  },
};
