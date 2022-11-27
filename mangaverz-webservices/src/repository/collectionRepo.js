const {
  prisma
} = require('../prisma/prisma');

const getCollectionById = async (id) => {
  return await prisma.mangacollection.findFirst({
    where: {
      id: id
    },
    select: {
      manga: true,
      user: true,
      statusreading: true
    }
  })
}

const getAllCollections = async () => {
  return await prisma.mangacollection.findMany({
    select: {
      id: true,
      manga: true,
      user: true,
      start_date: true,
      end_date: true,
      current_chapter: true,
      statusreading: true
    }
  });
}

const updateCollectionById = async (id, start_date,
  end_date,
  current_chapter,
  status_reading) => {
  const data = await prisma.mangacollection.update({
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
      statusreading:true
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
  return await prisma.mangacollection.delete();
}

const addMangaToCollection = async ({
  mangaId,
  start_date,
  end_date,
  user_id,
  current_chapter,
  status_reading
}) => {
  return await prisma.mangacollection.create({
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