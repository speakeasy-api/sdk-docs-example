import TypeScript from '@/icons/TypeScript';
import { LANGUAGES } from '@/utils/enums/languages';
import Go from '@/icons/Go';
import Java from '@/icons/Java';

export const languages = {
  [LANGUAGES.typescript]: {
    title: 'TypeScript',
    value: LANGUAGES.typescript,
    Icon: TypeScript,
  },
  [LANGUAGES.go]: {
    title: 'Go',
    value: LANGUAGES.go,
    Icon: Go,
  },
  [LANGUAGES.java]: {
    title: 'Java',
    value: LANGUAGES.java,
    Icon: Java,
  },
};
