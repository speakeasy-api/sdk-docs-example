import React from 'react';

import TypeScript from '@/icons/languages/typescript';
import Go from '@/icons/languages/go';
import Java from '@/icons/languages/java';
import Python from '@/icons/languages/python';
import CSharp from '@/icons/languages/csharp';
import Unity from '@/icons/languages/unity';
import Curl from '@/icons/languages/curl';
import { Language } from '@/content/languages';

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
  python: {
    title: 'Python',
    Icon: Python,
  },
  java: {
    title: 'Java',
    Icon: Java,
  },
  csharp: {
    title: 'C#',
    Icon: CSharp,
  },
  unity: {
    title: 'Unity',
    Icon: Unity,
  },
  curl: {
    title: 'cURL',
    Icon: Curl,
  },
};
