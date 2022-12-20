//Requires
const Router = require('@koa/router');
const prismaMangaService = require('../service/mangaf');
const Joi = require('joi');
const validate = require('./_validation');
const prismaUserSerice = require('../service/userf');
const {
  addUserInfo
} = require('../core/auth');
const {
  prisma
} = require('@prisma/client');
const {
  permissions,
  hasPermission
} = require('../core/auth');

//Router functies
const getAllMangas = async (ctx) => {
  ctx.body = await prismaMangaService.getAllMangaPrisma();
}

const createManga = async (ctx) => {
  let userId = 0;
  try {
    const user = await prismaUserSerice.getByAuth0ID(ctx.state.user.sub);
    userId = user.id;
  } catch (err) {
    await addUserInfo(ctx);
    const user = await prismaUserSerice.register({
      authid: ctx.state.user.sub,
      name: ctx.state.user.name
    });
    userId = user.id;
  }
  const newManga = await prismaMangaService.createMangaPrisma({
    ...ctx.request.body,
    release_date: new Date(ctx.request.body.release_date),
    userId: userId
  });
  ctx.body = newManga;
  ctx.status = 201;
}
createManga.validationScheme = {
  body: {
    name: Joi.string().required(),
    chapters: Joi.number().integer(),
    isFinished: Joi.boolean(),
    author: Joi.string(),
    release_date: Joi.date().less('now'),
    description: Joi.string(),
    thumbnail: Joi.string(),
    genreId: Joi.string().required()
  }
}
const getMangaById = async (ctx) => {
  ctx.body = await prismaMangaService.getMangaByIdPrisma(ctx.params.id);
  ctx.status = 200;
}
getMangaById.validationScheme = {
  params: Joi.object({
    id: Joi.string()
  }),
}
const deleteMangaById = async (ctx) => {
  await prismaMangaService.deleteMangaPrisma(ctx.params.id);
  ctx.status = 204;
}

const updateMangaById = async (ctx) => {
  let userId = 0;
  try {
    const user = await prismaUserSerice.getByAuth0ID(ctx.state.user.sub);
    userId = user.id;
  } catch (err) {
    await addUserInfo(ctx);
    const user = await prismaUserSerice.register({
      authid: ctx.state.user.sub,
      name: ctx.state.user.name
    });
    userId = user.id;
  }
  const newManga = await prismaMangaService.updateMangaByIdPrisma({
    ...ctx.request.body,
    id: ctx.params.id,
    userId: userId,
    release_date: new Date(ctx.request.body.release_date)
  });
  ctx.body = newManga;
  ctx.status = 201;
}
updateMangaById.validationScheme = {
  body: {
    name: Joi.string().optional(),
    chapters: Joi.number().integer().optional(),
    isFinished: Joi.boolean().optional(),
    author: Joi.string().optional(),
    release_date: Joi.date().less('now').optional(),
    description: Joi.string().optional(),
    genreId: Joi.string().optional()
  }
}

module.exports = (app) => {
  const router = new Router({
    prefix: '/mangas'
  });

  // hasPermission(permissions.loggedIn)
  //CRUD routers
  router.get('/', getAllMangas);
  router.get('/:id', validate(getMangaById.validationScheme), getMangaById);
  router.post('/', hasPermission(permissions.write), validate(createManga.validationScheme), createManga);
  router.put('/:id', hasPermission(permissions.write), validate(updateMangaById.validationScheme), updateMangaById);
  router.delete('/:id', deleteMangaById);
  app.use(router.routes()).use(router.allowedMethods());
}
// 
// 