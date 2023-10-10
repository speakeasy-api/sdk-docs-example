const withPlugins = require('next-compose-plugins');

const withNextra = require('nextra')({
    theme: 'nextra-theme-docs',
    themeConfig: './theme.config.tsx',
})

module.exports = withPlugins(
    [], withNextra({
    output: "export",
    distDir: 'build',
    images: {
      unoptimized: true
    }
  })
);
