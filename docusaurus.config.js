/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: 'MLOps for the edge',
  tagline: 'Portable containers for EdgeML built on Rust and Webassembly',
  url: 'https://hotg.dev',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'hotg-ai',
  projectName: 'dev.hotg.ai',
  themeConfig: {

    forceDarkMode: true,
    colorMode: {
      // "light" | "dark"
      defaultMode: "light",

      // Hides the switch in the navbar
      // Useful if you want to support a single color mode
      disableSwitch: false
    },
    navbar: {
      title: 'Rune - Edge Containers',
      logo: {
        alt: 'Tinyverse',
        src: 'img/logo.svg',
      },
      items: [
        {
          to: 'docs/',
          activeBasePath: 'docs',
          label: 'Documentation',
          position: 'left',
        },
        { href: 'https://Tinyverse.substack.com', label: 'Blog', position: 'left' },
        { href: 'https://hotg.ai', label: 'hotg.ai', position: 'right' },
        {
          href: 'https://github.com/hotg-ai/rune',
          label: 'GitHub',
          position: 'right',
        },
        {
          href: 'https://discord.gg/gPCNNvRnF4',
          label: 'Chat With Us',
          position: 'left'
        },
        {
          to: 'careers',
          label: 'Careers',
          position: 'left',
        },
      ],
    },
    footer: {
      style: 'light',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Get Started',
              to: 'docs/',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Twitter',
              href: 'https://twitter.com/hotg_ai',
            },
            {
              label: 'LinkedIn',
              href: 'https://www.linkedin.com/company/hotg-ai',
            }
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Blog',
              href: 'https://Tinyverse.substack.com',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/hotg-ai',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} hotg.ai inc. Built with Docusaurus.`,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl:
            'https://github.com/hotg-ai/dev.hotg.ai/edit/master/docs/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
        pages: {}
      },
    ],
  ],
};
