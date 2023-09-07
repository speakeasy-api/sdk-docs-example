import Link from 'next/link'
import type {NextraThemeLayoutProps} from 'nextra'
import DefaultLayout from 'nextra-theme-docs';

export default function Layout({children, pageOpts, themeConfig, pageProps}: NextraThemeLayoutProps) {
    return DefaultLayout({children, pageOpts, themeConfig, pageProps})
}