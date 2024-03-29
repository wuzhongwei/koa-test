const Koa = require("koa");
const logger = require("koa-logger");
const bodyParser = require("koa-bodyparser"); // 处理post请求
const static = require('koa-static');
const error = require('koa-json-error')
const parameter = require('koa-parameter') // 参数校验
const sha1 = require('sha1')
const { init: initDB } = require("./db");
const routing = require('./routers');
const {CODE_ERROR} = require('./utils/status')
const {wxToken} = require('./config/config')
const Result = require('./services/wx')

const app = new Koa();
// app.use((ctx, next) => {
//   const {signature, echostr, timestamp, nonce} = query
//   const arr = [timestamp, nonce, wxToken]
//   const arrSort = arr.sort()

//   console.log('ctx111111111111111', arrSort)
//   const str = arr.join('')
//   console.log('str', str)
//   const shaStr = sha1(str)
//   console.log('shaStr', shaStr)
//   if (shaStr === signature) {
//     ctx.body = {
//       echostr
//     }
//   } else {
//     ctx.body = {
//       error: '出错o'
//     }
//   }
// })
app.use(static(__dirname + '/client/vue-project/dist'))

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
  // await initDB();
  app.listen(port, () => {
    console.log("启动成功", port);
  });
}
bootstrap();
