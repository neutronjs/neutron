/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const [latestVersion] = require('./versions.json');

module.exports = {
  title: 'Neutron JS',
  tagline: 'The best tool to speed up your react project! 🚀',
  url: 'https://www.neutronjs.com/',
  baseUrl: '/',
  favicon: 'img/favicon.ico',
  organizationName: 'neutronjs',
  projectName: 'neutron-cli',
  themeConfig: {
    navbar: {
      title: 'Neutron JS',
      logo: {
        alt: 'Neutron Logo',
        src: 'img/logo-white.svg',
      },
      links: [
        {
          to: 'versions',
          label: `v${latestVersion}`,
          position: 'left',
          style: {
            whiteSpace: 'nowrap',
            padding: '0.25rem 0.5rem 0.2rem 0.25rem',
            fontSize: 'calc(0.9 * var(--ifm-font-size-base))',
            textDecoration: 'underline',
          },
        },
        {
          to: 'docs/introduction/getting-started',
          label: 'Docs',
          position: 'left',
        },
        {
          href: 'https://www.npmjs.com/package/@neutronjs/cli',
          label: 'Npm',
          position: 'right',
        },
        {
          href: 'https://github.com/neutronjs/neutron-cli',
          label: 'Github',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      // logo: { alt: "Open Source Logo", src: "/static/img/open-source.svg" },
      copyright: `Copyright © ${new Date().getFullYear()} Neutron JS.`,
    },
    gtag: {
      // Google Analytics
      trackingID: 'UA-155255497-1',
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
        },
        theme: {
          customCss: require.resolve('./src/styles/global.css'),
        },
      },
    ],
  ],
};
