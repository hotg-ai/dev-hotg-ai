const fs = require('fs');
const path = require('path');

const docs = path.join(__dirname, "docs");
const lessonDir = path.join(docs, "tutorials", "lessons");
const lessons = [];

for (const dir of fs.readdirSync(lessonDir)) {
  const readme = path.join(lessonDir, dir, "README.md");

  if (fs.existsSync(readme)) {
    lessons.push(path.join("tutorials", "lessons", dir, "README"));
  }
}

module.exports = {
  docs: [
    {
      type: 'doc',
      id: 'get_started'
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
      type: 'doc',
      id: 'get_rune'
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
