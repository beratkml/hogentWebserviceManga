//requires
const installMangaCollectionRouter = require('./_beheerManga');
const installHealthRouter = require('./_health');
const Router = require('@koa/router');

module.exports = (app) => {
  const router = new Router({
    prefix: '/api'
  });

  installMangaCollectionRouter(router);
  installHealthRouter(router);

  app.use(router.routes()).use(router.allowedMethods());
}