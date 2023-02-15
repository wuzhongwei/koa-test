const Koa = require("koa");
const Router = require("koa-router");
const logger = require("koa-logger");
const bodyParser = require("koa-bodyparser");

const error = require('koa-json-error')
const parameter = require('koa-parameter')
const { init: initDB } = require("./db");
const routing = require('./routers');
const status = require('./utils/status')

const app = new Koa();
app
  .use(error({
    postFormat: (e, {stack, ...rest}) => {
      return process.env.NODE_ENV === 'pro' ? rest : {stack, ...rest}
    }
  }))
  .use(logger())
  .use(bodyParser())
  .use(parameter(app))
  .use(status());
  routing(app);

const port = process.env.PORT || 80;
async function bootstrap() {
  await initDB();
  app.listen(port, () => {
    console.log("启动成功", port);
  });
}
bootstrap();
