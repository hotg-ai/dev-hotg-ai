const fs = require('fs');
const path = require('path');

const docs = path.join(__dirname, "docs");
const tutorials = path.join(docs, "tutorials");

const lessons = fs.readdirSync(tutorials)
  .filter(dir => dir.includes("lesson-") && fs.existsSync(path.join(tutorials, dir, "README.md")))
  .map(dir => path.join("tutorials", dir, "README"));

module.exports = {
  docs: [
    {
      type: 'doc',
      id: 'setup'
    },
    {
      type: 'doc',
      id: 'getting_started',
    },
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
