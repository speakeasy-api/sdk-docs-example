import { DocsThemeConfig } from 'nextra-theme-docs';

import ThemeToggle from '@/components/ThemeToggle';
import Logo from '@/icons/Logo';
import Footer from '@/components/Footer';

import { Header } from './components/header';
import { OramaSearch } from '@orama/plugin-nextra';
import { NavItem } from './components/navItem';
import Collapsible from './components/collapsible';

const config: DocsThemeConfig = {
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
    h1: Header('h1'),
    h2: Header('h2'),
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
