const {
  prisma
} = require('../prisma/prisma');

//create - update met autho0
const addNewUser = async ({
  authid,
  name
}) => {
  const user = await prisma.user.create({
    data: {
      authid: authid,
      name: name
    }
  })
  return user;
}

const getAllUsers = async () => {
  return await prisma.user.findMany({
    select: {
      id: true,
      authid: true
    }
  });
}

const findByAuth0Id = async (auth0id) => {
  return await prisma.user.findFirst({
    where: {
      authid: auth0id
    }
  })
}


module.exports = {
  addNewUser,
  getAllUsers,
  findByAuth0Id
}