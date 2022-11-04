//requirements en imports
const Koa = require('koa');
const {
  getLogger
} = require('./core/logging.js');
const config = require('config');
const bodyParser = require('koa-bodyparser');
const Router = require('@koa/router');


//object instanties, aanroep methodes, variabelen
const app = new Koa();
const router = new Router();
const logger = getLogger();

const NODE_ENV = config.get('env')
const LOG_LEVEL = config.get('log.level');
const LOG_DISABLED = config.get('log.disabled');


//else
logger.info(`${NODE_ENV} level: ${LOG_LEVEL}, disabled: ${LOG_DISABLED}`);
app.use(bodyParser());

router.get('/api/mangaverz', async (ctx) => {
  logger.info(JSON.stringify(ctx.request));
  ctx.body = [{
    name: 'Attack on Titan',
    description: 'lorem ipsum',
    author: 'Hajime Isayama',
  }]
})

app.use(router.routes()).use(router.allowedMethods());
app.listen(9000);
logger.info("Server start phieewww");