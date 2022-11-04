const Koa = require('koa')
const app = new Koa();

app.use(async (ctx, next) => {
  ctx.body = 'Hello World';
  await next();
})
string = ''
app.listen(9000);