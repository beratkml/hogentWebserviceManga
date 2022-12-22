const prismaUserRepo = require('../repository/user');
const ServiceError = require('../core/serviceError');
const {
  getLogger
} = require('../core/logging');

const register = async ({
  authid,
  name,
  nickname
}) => {
  return await prismaUserRepo.addNewUser({
    authid,
    name,
    nickname
  });
}

const getByAuth0ID = async (authid) => {
  const logger = getLogger();
  logger.info(`Fetching user with auth0id ${authid}`);
  const user = await prismaUserRepo.findByAuth0Id(authid);
  if (!user) {
    throw ServiceError.notFound(`No user with id ${authid} exists`, {
      authid,
    });
  }
  return user;
}

const getByNickname = async (nickname) => {
  const logger = getLogger();
  logger.info(`Fetching user with auth0id ${nickname}`);
  const user = await prismaUserRepo.findByNickname(nickname);
  if (!user) {
    throw ServiceError.notFound(`No user with nickname: ${nickname} exists`, {
      nickname,
    });
  }
  return user;
}

const getAllUsers = async () => {
  const user = await prismaUserRepo.getAllUsers();
  return {
    items: user,
    count: user.length
  }
}

module.exports = {
  register,
  getAllUsers,
  getByAuth0ID,
  getByNickname
}