const Router = require('@koa/router');
const prismaStatusService = require('../service/statusreadingf');
const Joi = require('joi');
const validate = require('./_validation');
const prismaUserSerice = require('../service/userf');
const {
  addUserInfo
} = require('../core/auth');

const getAllStatuses = async (ctx) => {
  ctx.body = await prismaStatusService.getAllStatuses();
}
const getStatusById = async (ctx) => {
  // ctx.body = await mangaCollectionService.getById(ctx.params.id);
  ctx.body = await prismaStatusService.getStatusIdPrisma(ctx.params.id);
}
module.exports = (app) => {
  const router = new Router({
    prefix: '/status'
  });

  //CRUD routers
  router.get('/', getAllStatuses);
  router.get('/:id', getStatusById);
  app.use(router.routes()).use(router.allowedMethods());
}