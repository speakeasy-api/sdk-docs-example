import { ComponentType } from 'react';

export interface ITab {
  key: string;
  label: string;
  content: ComponentType;
}
