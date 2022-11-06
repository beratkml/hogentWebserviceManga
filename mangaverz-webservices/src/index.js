//requirements en imports
const Koa = require('koa');
const {
  getLogger
} = require('./core/logging.js');
const config = require('config');
const bodyParser = require('koa-bodyparser');
const Router = require('@koa/router');
// const {
//   initializeDatabase
// } = require('./data/index');
const mangaCollectionService = require('./service/mangaf');


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
  ctx.body = mangaCollectionService.getAll();
})

router.post('/api/mangaverz', async (ctx) => {
  ctx.body = mangaCollectionService.create({
    ...ctx.request.body,
    start_date: new Date(ctx.request.body.start_date),
    end_date: new Date(ctx.request.body.end_date)
  })
})

router.get('/api/mangaverz/:id', async (ctx) => {
  ctx.body = mangaCollectionService.getById(ctx.params.id)
})

router.delete('/api/mangaverz/:id', async (ctx) => {
  mangaCollectionService.deleteById(ctx.params.id);
  ctx.status = 204;
})

router.put('/api/mangaverz/:id', async (ctx) => {
  ctx.body = mangaCollectionService.update(ctx.params.id, {
    ...ctx.request.body,
    start_date: new Date(ctx.request.body.start_date),
    end_date: new Date(ctx.request.body.end_date)
  })
})

app.use(router.routes()).use(router.allowedMethods());
app.listen(9000);
logger.info("Server start phieewww");