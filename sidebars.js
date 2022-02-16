const fs = require('fs');
const path = require('path');

const docs = path.join(__dirname, "docs");
const tutorials = path.join(docs, "rune", "tutorials");

const lessons = fs.readdirSync(tutorials)
  .filter(dir => dir.includes("lesson-") && fs.existsSync(path.join(tutorials, dir, "README.md")))
  .map(dir => path.join("rune", "tutorials", dir, "README"));

module.exports = {
  docs: [
    {
      type: 'doc',
      id: 'overview',
    },
    {
      type: 'category',
      label: 'Studio - No Code Env',
      collapsed: false,
      items: [
        'forge/overview',  // <-- links to an existing template + general workflow (build with canvas, test, deploy, etc.)
        'forge/javascript-sdk',
        'forge/dart-sdk',
        'forge/native-sdk',
      ]
    },
    {
      type: 'category',
      label: 'Rune - CLI Config',
      collapsed: false,
      items: [
        'rune/overview',
        'rune/install',
        'rune/building-a-rune',
        {
          type: 'category',
          label: 'Tutorial',
          collapsed: true,
          items: lessons
        }
      ]
    },
    {
      type: 'category',
      label: 'The Reference',
      collapsed: false,
      items: [
        'reference/runefile',
        'reference/capabilities',
        'reference/proc-blocks',
        'reference/models',
        'reference/outputs',
      ],
    },
    {
      type: 'category',
      label: 'For Rune Developers',
      items: [
        'internal/contributing',
      ],
    },
  ],
};

