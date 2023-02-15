const fs = require('fs');
module.exports = (app) => {
  fs.readdirSync(__dirname).forEach((file) => {
    if (file === 'index.js') return;
    const route = require(`./${file}`);
    if (route.routes) {
      app.use(route.routes()).use(route.allowedMethods())
    }
  })
}