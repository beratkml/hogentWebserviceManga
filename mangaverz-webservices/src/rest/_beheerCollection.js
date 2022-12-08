const Router = require('@koa/router');
const prismaCollectionService = require('../service/collectionf');
const prismaUserSerice = require('../service/userf');

const loadAllCollections = async (ctx) => {
  ctx.body = await prismaCollectionService.getAllCollections();
}
const addItemToCollection = async (ctx) => {
  ctx.body = await prismaCollectionService.addMangaToCollection({
    ...ctx.request.body,
    start_date: new Date(ctx.request.body.start_date),
    end_date: new Date(ctx.request.body.end_date),
  });
}

const getCollectionById = async (ctx) => {
  // ctx.body = await mangaCollectionService.getById(ctx.params.id);
  ctx.body = await prismaCollectionService.getCollectionById(ctx.params.id);
}

const deleteCollectionById = async (ctx) => {
  await prismaCollectionService.deleteColletionById(ctx.params.id);
  ctx.status = 204;
}

const updateCollectionById = async (ctx) => {
  ctx.body = await prismaCollectionService.updateCollectionById(ctx.params.id, {
    ...ctx.request.body,
    start_date: new Date(ctx.request.body.start_date),
    end_date: new Date(ctx.request.body.end_date)
  });
}

module.exports = (app) => {
  const router = new Router({
    prefix: '/collections'
  });

  //CRUD routers
  router.get('/', loadAllCollections);
  router.get('/:id', getCollectionById);
  router.post('/', addItemToCollection);
  router.put('/:id', updateCollectionById);
  router.delete('/:id', deleteCollectionById);

  app.use(router.routes()).use(router.allowedMethods());
}