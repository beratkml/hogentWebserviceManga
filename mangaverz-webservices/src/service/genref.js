const prismaGenreRepo = require('../repository/genreRepo');

const getAllGenres = async () => {
  const genres = await prismaGenreRepo.getAllGenres();
  return {
    items: genres,
  }
}
const deleteGenreById = async (id) => {
  await prismaGenreRepo.deleteGenreById(id);
}

const createGenre = async ({
  name
}) => {
  await prismaGenreRepo.createGenre(name);
}

module.exports = {
  getAllGenres,
  deleteGenreById,
  createGenre
}