const jsdom = require("jsdom");
const { JSDOM } = jsdom;

JSDOM.fromFile('build/index.html')
    .then((dom) => {
      let body = dom.window.document.getElementsByTagName('body');

      JSDOM.fromFile('firebase.conf.html').then((dom_fb) => {
            let body_fb = dom.window.document.getElementsByTagName('body');
            body[0].innerHTML = body[0].innerHTML + body_fb[0].innerHTML
      })
      console.log(dom.serialize());
    });