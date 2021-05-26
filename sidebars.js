module.exports = {
  docs: [
    { type: 'doc',
      id: 'get_started'
    },
    {
      type: 'doc',
      id: 'get_help'
    },
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
      label: 'Reference Docs',
      collapsed: false,
      items: [
        'reference/runefile_yml',
       // 'reference/rune_cli'
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
