//Requires
const Router = require('@koa/router');
const prismaMangaService = require('../service/mangaf');


//Router functies
const getAllMangas = async (ctx) => {
  ctx.body = await prismaMangaService.getAllMangaPrisma();
}

const createManga = async (ctx) => {
  ctx.body = await prismaMangaService.createMangaPrisma({
    ...ctx.request.body,
    release_date: new Date(ctx.request.body.release_date)
  });
}

const getMangaById = async (ctx) => {
  // ctx.body = await mangaCollectionService.getById(ctx.params.id);
  ctx.body = await prismaMangaService.getMangaByIdPrisma(ctx.params.id);
}

const deleteMangaById = async (ctx) => {
  await prismaMangaService.deleteMangaPrisma(ctx.params.id);
  ctx.status = 204;
}

const updateMangaById = async (ctx) => {
  // ctx.body = mangaCollectionService.update(ctx.params.id, {
  //   ...ctx.request.body,
  //   start_date: new Date(ctx.request.body.start_date),
  //   end_date: new Date(ctx.request.body.end_date)
  // })
  ctx.body = await prismaMangaService.updateMangaByIdPrisma(ctx.params.id, {
    ...ctx.request.body,
    release_date: new Date(ctx.request.body.release_date)
  });
}

module.exports = (app) => {
  const router = new Router({
    prefix: '/mangas'
  });

  //CRUD routers
  router.get('/', getAllMangas);
  router.get('/:id', getMangaById);
  router.post('/', createManga);
  router.put('/:id', updateMangaById);
  router.delete('/:id', deleteMangaById);
  app.use(router.routes()).use(router.allowedMethods());
}