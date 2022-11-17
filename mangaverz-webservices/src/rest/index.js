//requires
const installMangaRouter = require('./_beheerManga');
const installCollectionRouter = require('./_beheerCollection');
const installHealthRouter = require('./_health');
const Router = require('@koa/router');

module.exports = (app) => {
  const router = new Router({
    prefix: '/api'
  });

  installMangaRouter(router);
  installCollectionRouter(router);
  installHealthRouter(router);

  app.use(router.routes()).use(router.allowedMethods());
}