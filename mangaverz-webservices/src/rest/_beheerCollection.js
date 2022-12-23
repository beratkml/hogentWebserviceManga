const Router = require('@koa/router');
const prismaCollectionService = require('../service/collectionf');
const Joi = require('joi');
const validate = require('./_validation');
const prismaUserSerice = require('../service/userf');
const {
  addUserInfo
} = require('../core/auth');
const {
  permissions,
  hasPermission
} = require('../core/auth');

const loadAllCollections = async (ctx) => {
  ctx.body = await prismaCollectionService.getAllCollections();
}
loadAllCollections.validationScheme={
  params:Joi.object({
    id:Joi.string().optional()
  })
}
const addItemToCollection = async (ctx) => {
  let userId = 0;
  try {
    const user = await prismaUserSerice.getByAuth0ID(ctx.state.user.sub);
    userId = user.id;
  } catch (err) {
    await addUserInfo(ctx);
    const user = await prismaUserSerice.register({
      authid: ctx.state.user.sub,
      name: ctx.state.user.name,
      nickname:ctx.state.user.nickname
    });
    userId = user.id;
  }
  const newManga = await prismaCollectionService.addMangaToCollection({
    ...ctx.request.body,
    start_date: new Date(ctx.request.body.start_date),
    end_date: new Date(ctx.request.body.end_date),
    user_id: userId
  });
  ctx.body = newManga
  ctx.status = 201;
}
addItemToCollection.validationScheme = {
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

const getCollectionByNickname = async (ctx) => {
  // ctx.body = await mangaCollectionService.getById(ctx.params.id);
  ctx.body = await prismaCollectionService.getCollectionByNickname(ctx.params.id);
}

const getCollectionById = async (ctx) => {
  // ctx.body = await mangaCollectionService.getById(ctx.params.id);
  ctx.body = await prismaCollectionService.getCollectionById(ctx.params.id,ctx.params.id1);
}

const deleteCollectionById = async (ctx) => {
  await prismaCollectionService.deleteColletionById(ctx.params.id);
  ctx.status = 204;
}

const updateCollectionById = async (ctx) => {
  let userId = 0;
  try {
    const user = await prismaUserSerice.getByAuth0ID(ctx.state.user.sub);
    userId = user.id;
  } catch (err) {
    await addUserInfo(ctx);
    const user = await prismaUserSerice.register({
      authid: ctx.state.user.sub,
      name: ctx.state.user.name,
      nickname:ctx.state.user.nickname
    });
    userId = user.id;
  }
  const newManga = await prismaCollectionService.updateCollectionById({
    ...ctx.request.body,
    id: ctx.params.id,
    current_chapter:parseInt(ctx.request.body.current_chapter),
    start_date: new Date(ctx.request.body.start_date),
    end_date: new Date(ctx.request.body.end_date),
    user_id: userId
  });
  ctx.body = newManga
  ctx.status = 201;
}
updateCollectionById.validationScheme = {
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
    prefix: '/collections'
  });

  //CRUD routers
  router.get('/', loadAllCollections);
  router.get('/:id', getCollectionByNickname);
  router.get('/:id/:id1', getCollectionById);
  router.post('/', addItemToCollection);
  router.put('/:id', updateCollectionById);
  router.delete('/:id', deleteCollectionById);

  app.use(router.routes()).use(router.allowedMethods());
}