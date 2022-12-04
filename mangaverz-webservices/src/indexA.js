//requirements en imports
const Koa = require('koa');
const koaCors = require('@koa/cors');
const {
  getLogger,
  initializeLogger
} = require('./core/logging.js');
const config = require('config');
const bodyParser = require('koa-bodyparser');
const installREST = require('./rest/index');
const {
  initDatabase
} = require('./repository/index');
const {
  execSync
} = require('node:child_process');

const NODE_ENV = config.get('env')
const LOG_LEVEL = config.get('log.level');
const LOG_DISABLED = config.get('log.disabled');
initializeLogger({
  level: LOG_LEVEL,
  disabled: LOG_DISABLED,
  defaultMeta: {
    NODE_ENV
  }
})
const main = async () => {
  //object instanties, aanroep methodes, variabelen
  const logger = getLogger();
  const app = new Koa();
  //CORS gaat de URL controleren
  const CORS_ORIGINS = config.get('cors.origins');
  const CORS_MAX_AGE = config.get('cors.maxAge');
  app.use(
    koaCors({
      origin: (ctx) => {
        if (CORS_ORIGINS.indexOf(ctx.request.header.origin) !== -1) {
          return ctx.request.header.origin;
        }
        // Not a valid domain at this point, let's return the first valid as we should return a string
        return CORS_ORIGINS[0];
      },
      allowHeaders: ['Accept', 'Content-Type', 'Authorization'],
      maxAge: CORS_MAX_AGE,
    })
  );
  initDatabase();
  logger.info(`${NODE_ENV} level: ${LOG_LEVEL}, disabled: ${LOG_DISABLED}`);
  app.use(bodyParser());
  installREST(app);
  app.listen(9000);
  logger.info("Server start phieewww");
}

main();