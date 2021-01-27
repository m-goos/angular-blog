import fs = require('fs');

const blogs = [
  {
    title: 'How U got up to speed in Angular',
    date: 'December 20th'
  }
];

fs.writeFileSync(`assets/entry-list.md`, content, {
  encoding: 'utf8',
});
