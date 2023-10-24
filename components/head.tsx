import React from 'react';
import { useConfig } from 'nextra-theme-docs';

export const Head = () => {
  const { frontMatter } = useConfig();

  const title = frontMatter.title || 'Reference';

  return (
    <>
      <title>{title}</title>
      <meta property='og:title' content={title} />
      <meta
        property='og:description'
        content={frontMatter.description || 'An API reference'}
      />
    </>
  );
};
