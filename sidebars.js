module.exports = {
  docs: [
    {
      type: 'doc',
      id: 'overview'
    },
    {
      type: 'doc',
      id: 'get_rune'
    },
    {
      type: 'category',
      label: 'Getting Started',
      collapsed: false,
      items: [
        'getting_started/1',
        {
          type: 'category',
          label: 'Runes & Proc Blocks',
          items: [
            'tutorial',
            'proc_block_1',
            'proc_block_2',
            // 'getting-started',
            // 'create-a-page',
            // 'create-a-document',
            // 'create-a-blog-post',
            // 'markdown-features',
            // 'thank-you',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'Develop with Rune',
      items: [
        'develop/hello_world'
      ]
    },
    {
      type: 'doc',
      id: 'contribute'
    }
  ],
};
