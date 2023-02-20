const Koa = require("koa");
const logger = require("koa-logger");
const bodyParser = require("koa-bodyparser");
const static = require('koa-static');
const error = require('koa-json-error')
const parameter = require('koa-parameter')
const { init: initDB } = require("./db");
const routing = require('./routers');
const {CODE_ERROR} = require('./utils/status')
// const Result = require('./middlewares/result')

const app = new Koa();
app.use(static(__dirname + '/public'))

app
  .use(error({
    postFormat: (e, {stack, ...rest}) => {
      return process.env.NODE_ENV === 'pro' ? rest : {stack, ...rest, code: CODE_ERROR}
    }
  }))
  .use(logger())
  .use(bodyParser())
  .use(parameter(app))
  // .use(result(app));
  routing(app);

// app.on('error', err => {
//   log.error('server error', err)
// });
  

const port = process.env.PORT || 80;
async function bootstrap() {
  await initDB();
  app.listen(port, () => {
    console.log("启动成功", port);
  });
}
bootstrap();
