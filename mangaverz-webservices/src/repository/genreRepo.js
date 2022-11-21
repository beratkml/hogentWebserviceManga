const {
  prisma
} = require('../prisma/prisma');

const getAllGenres = async () => {
  return await prisma.genre.findMany();
}

const createGenre = async (name) => {
  await prisma.genre.create({
    data: {
      name: name
    }
  });
}

const deleteGenreById = async (id) => {
  await prisma.genre.delete({
    where: {
      id: id
    }
  })
}

module.exports = {
  getAllGenres,
  deleteGenreById,
  createGenre
}