const {
  prisma
} = require('../prisma/prisma');

const getCollectionById = async (id) => {
  return await prisma.mangaCollection.findFirst({
    where: {
      id: id
    },
    select: {
      manga: true,
      user: true,
      status_reading: true
    }
  })
}

const getAllCollections = async () => {
  return await prisma.mangaCollection.findMany({
    select: {
      id: true,
      manga: true,
      user: true,
      start_date: true,
      end_date: true,
      current_chapter: true,
      status_reading: true
    }
  });
}

const updateCollectionById = async (id, start_date,
  end_date,
  current_chapter,
  status_reading) => {
  const data = await prisma.mangaCollection.update({
    where: {
      id: id
    },
    select: {
      manga: {
        select: {
          name: true,
          description: true,
          author: true,
          chapters: true,
          isFinished: true,
          genre: true
        }
      },
      user: true,
      status_reading: true
    },
    data: {
      start_date: start_date,
      end_date: end_date,
      current_chapter: current_chapter,
      statusReadingId: status_reading
    }
  })
  return data;
}

const deleteColletionById = async (id) => {
  return await prisma.mangaCollection.delete();
}

const addMangaToCollection = async ({
  mangaId,
  start_date,
  end_date,
  user_id,
  current_chapter,
  status_reading
}) => {
  return await prisma.mangaCollection.create({
    data: {
      current_chapter: current_chapter,
      end_date: end_date,
      start_date: start_date,
      mangaId: mangaId,
      userId: user_id,
      statusReadingId: status_reading
    }
  });
}


module.exports = {
  getAllCollections,
  getCollectionById,
  updateCollectionById,
  deleteColletionById,
  addMangaToCollection,
}