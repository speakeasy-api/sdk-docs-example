import React from 'react'
import {DocsThemeConfig} from 'nextra-theme-docs'
import {useRouter} from "next/router";
import {slugString} from "./components/scrollHelpers";
import {Header} from './components/header';

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
        titleComponent({title}) {
            const router = useRouter()
            const pageTitle = title.split("/").pop()

            const slug = slugString(router);
            const titleSlug = title.toLowerCase()
            const selected = slug === titleSlug
            return <div style={{background: selected ? "cyan" : "none"}}>{pageTitle}</div>
        }
    },
    toc: {
        component: () => null,
    },
    components: {
        h2: Header,
    },
}

export default config
