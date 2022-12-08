const prismaUserRepo = require('../repository/user');
const ServiceError = require('../core/serviceError');
const {
  getLogger
} = require('../core/logging');

const register = async ({
  authid
}) => {
  return await prismaUserRepo.addNewUser({
    authid
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
  getByAuth0ID
}