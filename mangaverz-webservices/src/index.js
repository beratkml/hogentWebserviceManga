//requirements en imports
const Koa = require('koa');
const {
  getLogger
} = require('./core/logging.js');
const config = require('config');


//object instanties, aanroep methodes, variabelen
const app = new Koa();
const logger = getLogger();

const NODE_ENV = config.get('env')
const LOG_LEVEL = config.get('log.level');
const LOG_DISABLED = config.get('log.disabled');

logger.info(`${NODE_ENV} level: ${LOG_LEVEL}, disabled: ${LOG_DISABLED}`);
app.use(async (ctx, next) => {
  //ctx.body = 'Hello World';
  ctx.body = "Hellowww";
});
app.listen(9000);
logger.info("Server start phieewww");