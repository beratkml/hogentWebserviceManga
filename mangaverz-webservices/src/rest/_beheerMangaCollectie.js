//Requires
const Router = require('@koa/router');
const mangaCollectionService = require('../service/mangaf');


//Router functies
const getAllMangaCollection = async (ctx) => {
  ctx.body = await mangaCollectionService.getAll();
}

const createMangaCollection = async (ctx) => {
  ctx.body = mangaCollectionService.create({
    ...ctx.request.body,
    start_date: new Date(ctx.request.body.start_date),
    end_date: new Date(ctx.request.body.end_date)
  })
}

const getMangaFromCollectionById = async (ctx) => {
  ctx.body = mangaCollectionService.getById(ctx.params.id);
}

const deleteMangaFromCollectionById = async (ctx) => {
  mangaCollectionService.deleteById(ctx.params.id);
  ctx.status = 204;
}

const updateMangaFromCollectionById = async (ctx) => {
  ctx.body = mangaCollectionService.update(ctx.params.id, {
    ...ctx.request.body,
    start_date: new Date(ctx.request.body.start_date),
    end_date: new Date(ctx.request.body.end_date)
  })
}

module.exports = (app) => {
  const router = new Router({
    prefix: '/mangacollection'
  });

  //CRUD routers
  router.get('/', getAllMangaCollection);
  router.get('/:id', getMangaFromCollectionById);
  router.post('/', createMangaCollection);
  router.put('/:id', updateMangaFromCollectionById);
  router.delete('/:id', deleteMangaFromCollectionById);

  app.use(router.routes()).use(router.allowedMethods());
}