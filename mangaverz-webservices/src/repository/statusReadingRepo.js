const {
  prisma
} = require('../prisma/prisma');

const getAllStatuses = async () => {
  return await prisma.statusreading.findMany({
    select: {
      id: true,
      type: true
    }
  });
}

const getStatusById = async (id) => {
  return await prisma.statusreading.findFirst({
    where: {
      id: id,
    },
    select: {
      id: true,
      type: true
    }
  });
}

module.exports = {
  getAllStatuses,
  getStatusById
}