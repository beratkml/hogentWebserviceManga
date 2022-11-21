const Router = require('@koa/router');
const prismaGenreService = require('../service/genref');

const loadAllGenres = async (ctx) => {
  ctx.body = await prismaGenreService.getAllGenres();
}

const deleteGenreById = async (ctx) => {
  ctx.body = await prismaGenreService.deleteGenreById(ctx.params.id);
}

const createGenre = async (ctx) => {
  ctx.body = await prismaGenreService.createGenre({
    ...ctx.request.body
  });
}

module.exports = (app) => {
  const router = new Router({
    prefix: '/genres'
  });

  //CRUD routers
  router.get('/', loadAllGenres);
  router.delete('/:id', deleteGenreById);
  router.post('/', createGenre);

  app.use(router.routes()).use(router.allowedMethods());
}