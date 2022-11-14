let {
  MANGA,
  MANGACOLLECTION
} = require('../data/testData');


const prismaRepos = require('../repository/index');

const getMangaByIdPrisma = async (id) => {
  return await prismaRepos.mangaById(id);
}

const getAllMangaPrisma = async () => {
  const mangas = await prismaRepos.getAllManga();
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
  const data = await prismaRepos.addNewManga(name, chapters, isFinished, author, release_date, description, genreId);
  return data;
}

const deleteMangaPrisma = async (id) => {
  await prismaRepos.deleteMangaById(id);
}

const updateMangaByIdPrisma = async (id, {
  name,
  chapters,
  isFinished,
  author,
  release_date,
  description,
  genreId
}) => {
  const data = await prismaRepos.updateMangaById(id, name, chapters, isFinished, author, release_date, description, genreId);
  console.log(data);
  return data;
}

const update = (id, {
  start_date,
  end_date,
  current_chapter,
  status_reading
}) => {
  let mangaInCollectie = MANGACOLLECTION.find(e => e.id === parseInt(id));
  if (!mangaInCollectie) {
    throw new Error(`Manga bestaat niet`)
  }
  mangaInCollectie.end_date = end_date.toISOString();
  mangaInCollectie.start_date = start_date.toISOString();
  mangaInCollectie.status_reading = status_reading
  mangaInCollectie.current_chapter = current_chapter
  return mangaInCollectie;
}

module.exports = {
  update,
  deleteMangaPrisma,
  getMangaByIdPrisma,
  getAllMangaPrisma,
  createMangaPrisma,
  updateMangaByIdPrisma
}