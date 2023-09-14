import React from 'react'
import {DocsThemeConfig} from 'nextra-theme-docs'
import {Header} from './components/header';
import {OramaSearch} from '@orama/plugin-nextra'
import {NavItem} from "./components/navItem";
import Collapsible from "./components/collapsible";

const config: DocsThemeConfig = {
    logo: <span>My Project</span>,
    project: {
        link: 'https://github.com/shuding/nextra-docs-template',
    },
    chat: {
        link: 'https://discord.com',
    },
    docsRepositoryBase: 'https://github.com/shuding/nextra-docs-template',
    footer: {
        text: 'Nextra Docs Template',
    },
    sidebar: {
        titleComponent: NavItem,
    },
    toc: {
        component: () => null,
    },
    components: {
        h1: Header("h1"),
        h2: Header("h2"),
        Collapsible,
    },
    search: {
        component: () => OramaSearch(),
    },
}

export default config
