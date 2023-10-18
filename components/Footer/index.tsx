import React, { FC } from 'react';
import NextLink from 'next/link';

import Logo from '@/icons/Logo';
import {
  footerGenLinks,
  footerSocialLinks,
  IFooterGenLinksItem,
} from '@/utils/helpers';

import styles from './styles.module.scss';

const Footer: FC = () => (
  <footer className={styles.footer}>
    <Logo />
    <div className={styles.footer_links}>
      <div className={styles.footer_links_general}>
        {footerGenLinks.map((link: IFooterGenLinksItem) => (
          <NextLink
            href={link.hrefTo}
            key={link.id}
            className={styles.footer_links_general_link}
          >
            {link.name}
          </NextLink>
        ))}
      </div>
      <div className={styles.footer_links_social}>
        <div className={styles.footer_links_social_icons}>
          {footerSocialLinks.map(
            (socLink: { type: string; hrefTo: string; component: FC }) => (
              <NextLink
                href={socLink.hrefTo}
                key={socLink.type}
                target='_blank'
              >
                <socLink.component />
              </NextLink>
            ),
          )}
        </div>
        <p className={styles.footer_links_social_inc}>
          © 2023 Speakeasy, Inc. All Rights Reserved.
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
