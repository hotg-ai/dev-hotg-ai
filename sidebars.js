const fs = require('fs');
const path = require('path');

const docs = path.join(__dirname, "docs");
const tutorials = path.join(docs, "tutorials");

const lessons = fs.readdirSync(tutorials)
  .filter(dir => dir.includes("lesson-") && fs.existsSync(path.join(tutorials, dir, "README.md")))
  .map(dir => path.join("tutorials", dir, "README"));

module.exports = {
  docs: [
    // Videos for overview of the system
    {
      type: 'doc',
      id: 'setup'
    },
    {
      type: 'doc',
      id: 'getting_started', //change this to studio => https://studio.hotg.ai => workshop link => make you apps: Read more => Forge SDK or Learn about Rune goes to the current stuff

    },
    // {
    //   type: 'category',
    //   id: 'runtimes',
    //   label: 'Forge SDK'
    // },
    // {
    //   type: 'category',
    //   id: 'runtimes',
    //   label: 'Rune'
    // },
    {
      type: 'category',
      label: 'Tutorial',
      collapsed: true,
      items: lessons
    },
    
    {
      type: 'doc',
      id: 'overview'
    },
    {
      type: 'category',
      label: 'Reference Docs',
      collapsed: false,
      items: [
        'reference/runefile_yml',
        'reference/rune_cli'
      ],
    },
    {
      type: 'doc',
      id: 'contribute'
    },
  ],
};