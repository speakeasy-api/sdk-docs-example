import { FC } from 'react';
import GitHub from '@/icons/GitHub';
import Twitter from '@/icons/Twitter';
import Slack from '@/icons/Slack';
import Linkedin from '@/icons/Linkedin';

export const isBrowser = typeof window !== 'undefined';

export interface IFooterGenLinksItem {
  id: number,
  name: string,
  hrefTo: string
}

export const footerGenLinks: Array<IFooterGenLinksItem> = [
  {id: 0, name: "Product", hrefTo: '/product'},
  {id: 1, name: "Pricing", hrefTo: '/pricing'},
  {id: 2, name: "Docs", hrefTo: '/docs'},
  {id: 3, name: "Careers", hrefTo: '/careers'},
  {id: 4, name: "Blog", hrefTo: '/blog'},
  {id: 5, name: "Privacy", hrefTo: '/privacy'},
  {id: 6, name: "Terms", hrefTo: '/terms'}
];

export const footerSocialLinks: Array<{type: string, hrefTo: string, component: FC}>= [
  {type: "github-icon", hrefTo: 'https://github.com/speakeasy-api', component: GitHub},
  {type: "twitter-icon", hrefTo: 'https://twitter.com/speakeasydev', component: Twitter},
  {type: "slack-icon", hrefTo: 'https://join.slack.com/t/speakeasy-dev/shared_invite/zt-1cwb3flxz-lS5SyZxAsF_3NOq5xc8Cjw', component: Slack},
  {type: "linkedin-icon", hrefTo: 'https://linkedin.com/company/76569023', component: Linkedin}
];

