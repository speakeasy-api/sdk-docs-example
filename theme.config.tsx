import { DocsThemeConfig } from 'nextra-theme-docs';
import { OramaSearch } from '@orama/plugin-nextra';
import React, { FC, ReactNode } from 'react';

import ThemeToggle from '@/components/ThemeToggle';
import Logo from '@/icons/Logo';
import Footer from '@/components/Footer';
import TextHeaderWrapper from '@/components/TextHeaderWrapper';
import LinkWrapper from '@/components/LinkWrapper';
import { RHS } from '@/components/Columns';
import { Head } from '@/components/head';
import { NavItem } from '@/components/NavItem';
import Collapsible, { propsType } from '@/components/Collapsible';

interface ICustomDocsThemeConfig extends Omit<DocsThemeConfig, 'components'> {
  components: {
    h1: FC<{ children: ReactNode }>;
    h2: FC<{ children: ReactNode }>;
    h3: FC<{ children: ReactNode }>;
    h4: FC<{ children: ReactNode }>;
    h5: FC<{ children: ReactNode }>;
    h6: FC<{ children: ReactNode }>;
    a: FC<{ children: ReactNode; href: string }>;
    RHS: FC<{ children: ReactNode }>;
    Collapsible?: FC<propsType>;
    blockquote?: any; // TODO add correct types
  };
}

const config: ICustomDocsThemeConfig = {
  logo: Logo,
  logoLink: false,
  chat: {},
  docsRepositoryBase: 'https://github.com/shuding/nextra-docs-template',
  footer: {
    component: Footer,
  },
  sidebar: {
    titleComponent: NavItem,
    autoCollapse: true,
    defaultMenuCollapseLevel: 1,
  },
  toc: {
    // Remove Table of Contents
    component: () => null,
  },
  primaryHue: 135,
  primarySaturation: 100,
  components: {
    h1: ({ children }) => (
      <TextHeaderWrapper headingType='h1'>{children}</TextHeaderWrapper>
    ),
    h2: ({ children }) => (
      <TextHeaderWrapper headingType='h2'>{children}</TextHeaderWrapper>
    ),
    h3: ({ children }) => (
      <TextHeaderWrapper headingType='h3'>{children}</TextHeaderWrapper>
    ),
    h4: ({ children }) => (
      <TextHeaderWrapper headingType='h4'>{children}</TextHeaderWrapper>
    ),
    h5: ({ children }) => (
      <TextHeaderWrapper headingType='h5'>{children}</TextHeaderWrapper>
    ),
    h6: ({ children }) => (
      <TextHeaderWrapper headingType='h6'>{children}</TextHeaderWrapper>
    ),
    a: ({ href, children }) => (
      <LinkWrapper href={href}>{children}</LinkWrapper>
    ),
    RHS,
    Collapsible,
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
  head: Head,
};

export default config;
