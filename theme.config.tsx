import { DocsThemeConfig } from 'nextra-theme-docs';
import { OramaSearch } from '@orama/plugin-nextra';
import React, { FC, ReactNode } from 'react';

import ThemeToggle from '@/components/ThemeToggle';
import Logo from '@/icons/Logo';
import Footer from '@/components/Footer';
import TextHeaderWrapper from '@/HOC/TextHeaderWrapper';
import LinkWrapper from '@/HOC/LinkWrapper';
import CodeBlock from '@/components/CodeBlock';

import { NavItem } from './components/NavItem';
import Collapsible from './components/collapsible';

interface ICustomDocsThemeConfig extends Omit<DocsThemeConfig, 'components'> {
  components: {
    h1: FC<{ children: ReactNode }>;
    h2: FC<{ children: ReactNode }>;
    h3: FC<{ children: ReactNode }>;
    h4: FC<{ children: ReactNode }>;
    h6: FC<{ children: ReactNode }>;
    a: FC<{ children: ReactNode, href: string }>;
    pre: FC<{ children: ReactNode, hasCopyCode: boolean, filename?: string }>;
    Collapsible?: any; // TODO add correct types
    blockquote?: any; // TODO add correct types
  };
}

const config: ICustomDocsThemeConfig = {
  logo: Logo,
  project: {
    link: 'https://github.com/shuding/nextra-docs-template',
  },
  chat: {
    link: 'https://discord.com',
  },
  docsRepositoryBase: 'https://github.com/shuding/nextra-docs-template',
  footer: {
    component: Footer,
  },
  sidebar: {
    titleComponent: NavItem,
  },
  toc: {
    component: () => null,
  },
  components: {
    h1: ({ children }) => (
      <TextHeaderWrapper headingType="h1">
        {children}
      </TextHeaderWrapper>
    ),
    h2: ({ children }) => (
      <TextHeaderWrapper headingType="h2">
        {children}
      </TextHeaderWrapper>
    ),
    h3: ({ children }) => (
      <TextHeaderWrapper headingType="h3">
        {children}
      </TextHeaderWrapper>
    ),
    h4: ({ children }) => (
      <TextHeaderWrapper headingType="h4">
        {children}
      </TextHeaderWrapper>
    ),
    h6: ({ children }) => (
      <TextHeaderWrapper headingType="h6">
        {children}
      </TextHeaderWrapper>
    ),
    a: ({ href, children }) => (
      <LinkWrapper href={href}>
        {children}
      </LinkWrapper>
    ),
    pre: ({ children, ...props }) => (
      <CodeBlock {...props}>
        {children}
      </CodeBlock>
    ),
    Collapsible,
    blockquote: Collapsible,
  },
  search: {
    component: () => OramaSearch(),
  },
  navbar: {
    extraContent: ThemeToggle,
  },
  navigation: false,
  gitTimestamp: () => null,
  darkMode: false,
};

export default config;
