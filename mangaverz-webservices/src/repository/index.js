const {
  PrismaClient
} = require('@prisma/client');
const {
  query
} = require('winston');

const prisma = new PrismaClient({
  log: ["query"]
});

//Manga Operations
const mangaById = async (id) => {
  const manga = await prisma.manga.findFirst({
    where: {
      id: id
    },
    select: {
      name: true,
      description: true,
      author: true,
      chapters: true,
      isFinished: true,
      genre: {
        select: {
          name: true
        }
      }
    }
  })
  return manga;
}

const getAllManga = async () => {
  return await prisma.manga.findMany();
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
      genreId: genreId,
      isFinished: isFinished,
      name: name,
      release_date: release_date
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
  genreId
) => {
  const manga = await prisma.manga.create({
    data: {
      author: author,
      chapters: chapters,
      description: description,
      isFinished: isFinished,
      name: name,
      release_date: release_date,
      genreId: genreId
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

//Collection Operations
//User Operations


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