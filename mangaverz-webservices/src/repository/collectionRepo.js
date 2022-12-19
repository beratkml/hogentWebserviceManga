const {
  prisma
} = require('../prisma/prisma');

const getCollectionById = async (id) => {
  return await prisma.mangacollection.findFirst({
    where: {
      id: id
    },
    select: {
      manga: {
        select: {
          id: true,
          name: true,
          chapters: true,
          isFinished: true,
          author: true,
          release_date: true,
          description: true,
          thumbnail: true,
          genre: true
        }
      },
      user: {
        select: {
          id: true,
          name: true,
          authid: true,
        }
      },
      statusreading: {
        select: {
          id: true,
          type: true
        }
      }
    }
  })
}

const getAllCollections = async () => {
  return await prisma.mangacollection.findMany({
    select: {
      id: true,
      manga: {
        select: {
          id: true,
          name: true,
          chapters: true,
          isFinished: true,
          author: true,
          release_date: true,
          description: true,
          thumbnail: true,
          genre: true
        }
      },
      user: {
        select: {
          id: true,
          authid: true,
          name: true
        }
      },
      start_date: true,
      end_date: true,
      current_chapter: true,
      statusreading: {
        select: {
          id: true,
          type: true
        }
      }
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
          thumbnail: true,
          genre: true
        }
      },
      user: {
        select: {
          id: true,
          name: true,
          authid: true
        }
      },
      statusreading: {
        select: {
          id: true,
          type: true
        }
      }
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
  await prisma.mangacollection.delete({
    where: {
      id: id
    }
  })
}

const addMangaToCollection = async (
  mangaId,
  start_date,
  end_date,
  user_id,
  current_chapter,
  status_reading
) => {
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