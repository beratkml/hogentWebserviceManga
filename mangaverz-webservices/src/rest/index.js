//requires
const installMangaRouter = require('./_beheerManga');
const installCollectionRouter = require('./_beheerCollection');
const installHealthRouter = require('./_health');
const installGenreRouter = require('./_beheerGenres');
const installUserRouter = require('./_beheerUser');
const Router = require('@koa/router');

module.exports = (app) => {
  const router = new Router({
    prefix: '/api'
  });

  installUserRouter(router);
  installMangaRouter(router);
  installGenreRouter(router);
  installCollectionRouter(router);
  installHealthRouter(router);

  app.use(router.routes()).use(router.allowedMethods());
}