const prismaCollectionRepo = require('../repository/collectionRepo');

const getCollectionById = async (id) => {
  return await prismaCollectionRepo.getCollectionById(id);
}

const getAllCollections = async () => {
  const collection = await prismaCollectionRepo.getAllCollections();
  return {
    items: collection,
    count: collection.length
  }
}

const updateCollectionById = async ({
  id,
  start_date,
  end_date,
  current_chapter,
  status_reading
}) => {
  const data = await prismaCollectionRepo.updateCollectionById(id, start_date, end_date, current_chapter, status_reading);
  return data;
}

const deleteColletionById = async (id) => {
  return await prismaCollectionRepo.deleteColletionById(id);
}

const addMangaToCollection = async ({
  mangaId,
  start_date,
  end_date,
  user_id,
  current_chapter,
  status_reading
}) => {
  return await prismaCollectionRepo.addMangaToCollection(
    mangaId,
    start_date,
    end_date,
    user_id,
    current_chapter,
    status_reading
  );
}

module.exports = {
  getCollectionById,
  updateCollectionById,
  deleteColletionById,
  getAllCollections,
  addMangaToCollection
}