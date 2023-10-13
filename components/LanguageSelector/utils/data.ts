import TypeScript from '@/icons/TypeScript';
import { Language } from '@/utils/enums/language';
import Go from '@/icons/Go';
import React from 'react';

type languageInfo = {
  title: string;
  Icon: React.FC;
};

export const languageData: Record<Language, languageInfo> = {
  'typescript': {
    title: 'TypeScript',
    Icon: TypeScript,
  },
  'go': {
    title: 'Go',
    Icon: Go,
  },
};
