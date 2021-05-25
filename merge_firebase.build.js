const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const fs = require('fs')

JSDOM.fromFile('build/index.html.bak')
    .then((dom) => {
      let body = dom.window.document.getElementsByTagName('body');

      JSDOM.fromFile('firebase.conf.html').then((dom_fb) => {
            let body_fb = dom_fb.window.document.getElementsByTagName('body');
            body[0].innerHTML = body[0].innerHTML + body_fb[0].innerHTML
            fs.writeFileSync('build/index.html', dom.serialize());
      })
      
    });