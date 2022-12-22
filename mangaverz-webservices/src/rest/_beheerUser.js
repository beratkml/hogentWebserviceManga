const Router = require('@koa/router');
const prismaUserService = require('../service/userf');
const Joi = require('joi');
const validate = require('./_validation');
const {
  addUserInfo
} = require('../core/auth')

const createUser = async (ctx) => {
  ctx.body = await prismaUserService.register({
    ...ctx.request.body
  });
  ctx.status = 201;
}
const getAllUsers = async (ctx) => {
  ctx.body = await prismaUserService.getAllUsers();
}

const getUserByNickname = async(ctx)=>{
  ctx.body = await prismaUserService.getByNickname(ctx.params.nickname);
}


module.exports = (app) => {
  const router = new Router({
    prefix: '/users'
  });
  //CRUD routers
  router.get('/', getAllUsers);
  router.get('/:nickname', getUserByNickname)
  router.post('/', createUser);
  app.use(router.routes()).use(router.allowedMethods());
}