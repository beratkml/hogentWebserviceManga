//requirements en imports
const Koa = require('koa');
const {
  getLogger
} = require('./core/logging.js');


//object instanties en aanroep methodes
const app = new Koa();
const logger = getLogger();

app.use(async (ctx, next) => {
  //ctx.body = 'Hello World';
  ctx.body = "Hellowww";
});
app.listen(9000);
logger.info("Server start phieewww");