const {
  prisma
} = require('../prisma/prisma');

//Manga Operations
const mangaById = async (id) => {
  const manga = await prisma.manga.findFirst({
    where: {
      id: id
    },
    select: {
      id: true,
      name: true,
      description: true,
      author: true,
      chapters: true,
      isFinished: true,
      release_date: true,
      thumbnail: true,
      genre: true
    }
  })
  return manga;
}

const getAllManga = async () => {
  return await prisma.manga.findMany({
    select: {
      id: true,
      name: true,
      description: true,
      author: true,
      release_date: true,
      chapters: true,
      isFinished: true,
      thumbnail: true,
      genre: true
    }
  });
}

const updateMangaById = async (id,
  name,
  chapters,
  isFinished,
  author,
  release_date,
  description,
  genreId
) => {
  const manga = await prisma.manga.update({
    where: {
      id: id
    },
    data: {
      author: author,
      chapters: chapters,
      description: description,
      isFinished: isFinished,
      name: name,
      release_date: release_date,
      genreId: genreId,
    }
  })
  return manga;
}

const addNewManga = async (
  name,
  chapters,
  isFinished,
  author,
  release_date,
  description,
  thumbnail,
  genreId,
  userId
) => {
  const manga = await prisma.manga.create({
    data: {
      author: author,
      chapters: chapters,
      description: description,
      isFinished: isFinished,
      name: name,
      release_date: release_date,
      thumbnail: thumbnail,
      genreId: genreId,
      userId: userId
    }
  })
  return manga;
}

const deleteMangaById = async (id) => {
  await prisma.manga.delete({
    where: {
      id: id
    }
  })
}

//Testen
const main = async () => {
  console.log(await prisma.manga.findMany());
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })

module.exports = {
  mangaById,
  getAllManga,
  updateMangaById,
  addNewManga,
  deleteMangaById
}