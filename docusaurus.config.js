/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: 'Tinyverse',
  tagline: 'Tools to build, deploy and manage TinyML apps',
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
      title: 'Tinyverse',
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
        // {
        //   to: 'runevm',
        //   label: 'RuneVM',
        //   position: 'left',
        // },
        {href: 'https://Tinyverse.substack.com', label: 'Blog', position: 'left'},
        {href: 'https://hotg.ai', label: 'hotg.ai', position: 'right'},
        {
          href: 'https://github.com/hotg-ai/rune',
          label: 'GitHub',
          position: 'right',
        },
        {
          href: 'https://tinyverse.discourse.group',
          label: 'Forums',
          position: 'left'
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
      style: 'dark',
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
