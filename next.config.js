const withPlugins = require('next-compose-plugins');
const { remarkCodeHike } = require('@code-hike/mdx');

const withNextra = require('nextra')({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.tsx',
  mdxOptions: {
    remarkPlugins: [
      [
        remarkCodeHike,
        { lineNumbers: true, showCopyButton: true, theme: 'material-darker' },
      ],
    ],
  },
});

module.exports = withPlugins(
  [],
  withNextra({
    output: 'export',
    distDir: 'out',
    images: {
      unoptimized: true,
    },
  }),
);
