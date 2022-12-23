const prismaCollectionRepo = require('../repository/collectionRepo');

const getCollectionByNickname = async (id) => {
  const collection =  await prismaCollectionRepo.getCollectionByUser(id);
  return {
    items: collection,
    count: collection.length
  }
}

const getCollectionById = async (id,id1) => {
  const collection =  await prismaCollectionRepo.getCollectionById(id,id1);
  return {
    collection
  }
}

const filterCollectionByAUTH0ID = async(id,authid)=>{
  return await prismaCollectionRepo.filterCollectionByAUTH0ID(id,authid);
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
  getCollectionByNickname,
  updateCollectionById,
  deleteColletionById,
  getAllCollections,
  addMangaToCollection,
  getCollectionById
}