const prismaMangaRepo = require('../repository/mangasRepo');
const ServiceError = require('../core/serviceError');
const getMangaByIdPrisma = async (id) => {
  const manga = await prismaMangaRepo.mangaById(id);
  if (!manga) {
    throw ServiceError.notFound(`Manga with id ${id} does not exist`, {
      id
    });
  }
  return manga;
}

const getAllMangaPrisma = async () => {
  const mangas = await prismaMangaRepo.getAllManga();
  return {
    items: mangas,
    count: mangas.length
  }
}

const createMangaPrisma = async ({
  name,
  chapters,
  isFinished,
  author,
  release_date,
  description,
  thumbnail,
  genreId,
  userId
}) => {
  const data = await prismaMangaRepo.addNewManga(name, chapters, isFinished, author, release_date, description, thumbnail, genreId, userId);
  return data;
}

const deleteMangaPrisma = async (id) => {
  await prismaMangaRepo.deleteMangaById(id);
}


const updateMangaByIdPrisma = async ({
  id,
  name,
  chapters,
  isFinished,
  author,
  release_date,
  description,
  genreId
}) => {
  const data = await prismaMangaRepo.updateMangaById(id, name, chapters, isFinished, author, release_date, description, genreId);
  console.log(data);
  return data;
}

module.exports = {
  deleteMangaPrisma,
  getMangaByIdPrisma,
  getAllMangaPrisma,
  createMangaPrisma,
  updateMangaByIdPrisma,
}