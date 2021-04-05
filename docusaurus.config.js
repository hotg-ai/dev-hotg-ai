/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: 'HOTG-ai',
  tagline: 'Tools to build, deploy and manage your tinyverse',
  url: 'https://hotg.dev',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'hotg-ai', // Usually your GitHub org/user name.
  projectName: 'dev.hotg.ai', // Usually your repo name.
  themeConfig: {

    forceDarkMode: true,
    colorMode: {
      // "light" | "dark"
      defaultMode: 'dark',

      // Hides the switch in the navbar
      // Useful if you want to support a single color mode
      disableSwitch: true
    },
    navbar: {
      title: 'TinyVerse',
      logo: {
        alt: 'TinyVerse',
        src: 'img/logo.svg',
      },
      items: [
        {
          to: 'docs/',
          activeBasePath: 'docs',
          label: 'Docs',
          position: 'left',
        },
        {
          to: 'runevm',
          label: 'RuneVM',
          position: 'left',
        },
        {href: 'https://tinyverse.substack.com', label: 'Blog', position: 'left'},
        {
          href: 'https://github.com/hotg-ai/rune',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Getting Started',
              to: 'docs/',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            // {
            //   label: 'Stack Overflow',
            //   href: 'https://stackoverflow.com/questions/tagged/docusaurus',
            // },
            // {
            //   label: 'Discord',
            //   href: 'https://discordapp.com/invite/docusaurus',
            // },
            {
              label: 'Twitter',
              href: 'https://twitter.com/hotg_ai',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Blog',
              href: 'https://tinyverse.substack.com',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/hotg-ai',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} HOTG-ai, Inc. Built with Docusaurus.`,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl:
            'https://github.com/hotg-ai/dev.hotg.ai/edit/master/docs/',
        },
        // blog: {
        //   showReadingTime: true,
        //   // Please change this to your repo.
        //   editUrl:
        //     'https://github.com/hotg-ai/dev.hotg.ai/edit/master/blog/',
        // },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
        pages: {
          
        }
      },
    ],
  ],
};
