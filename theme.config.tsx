import React from 'react'
import {DocsThemeConfig} from 'nextra-theme-docs'
import {Header} from './components/header';
import {OramaSearch} from '@orama/plugin-nextra'
import {NavItem} from "./components/navItem";
import Collapsible from "./components/collapsible";
import {RHS} from "./components/columns";
import {Head} from "./components/head";

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
        component: () => null,
    },
    sidebar: {
        titleComponent: NavItem,
    },
    toc: {
        float: false,
        component: () => null,
    },
    components: {
        h1: Header("h1"),
        h2: Header("h2"),
        h3: Header("h3"),
        RHS,
        Collapsible,
    },
    search: {
        component: () => OramaSearch(),
    },
    navigation: false,
    head: Head,
}

export default config
