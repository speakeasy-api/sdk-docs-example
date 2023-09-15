const withPlugins = require('next-compose-plugins');

const withNextra = require('nextra')({
    theme: 'nextra-theme-docs',
    themeConfig: './theme.config.tsx',
})

const redirects = {
    async redirects() {
        return [
            {
                source: '/',
                destination: '/reference',
                permanent: true,
            },
            {
                source: '/reference',
                destination: '/reference/home',
                permanent: true,
            },
        ]
    },
};

module.exports = withPlugins(
    [
        [redirects], // you can directly drop your redirect rules here
    ], withNextra()
);
