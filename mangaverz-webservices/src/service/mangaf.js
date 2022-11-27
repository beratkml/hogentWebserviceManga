const prismaMangaRepo = require('../repository/mangasRepo');

const getMangaByIdPrisma = async (id) => {
  return await prismaMangaRepo.mangaById(id);
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
  genreId
}) => {
  const data = await prismaMangaRepo.addNewManga(name, chapters, isFinished, author, release_date, description, genreId);
  return data;
}

const deleteMangaPrisma = async (id) => {
  await prismaMangaRepo.deleteMangaById(id);
}


const updateMangaByIdPrisma = async ({
  id,
  startDate,
  endDate,
  current_chapter,
  status_reading
}) => {
  const data = await prismaMangaRepo.updateMangaById(id, startDate, endDate, current_chapter, release_date, status_reading);
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