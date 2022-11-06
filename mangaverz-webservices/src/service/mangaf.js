let {
  MANGA,
  MANGACOLLECTION
} = require('../data/testData');

const getAll = () => {
  return {
    items: MANGACOLLECTION,
    count: MANGACOLLECTION.length
  }
}

const getById = (id) => {
  return {
    item: MANGACOLLECTION.find(e => e.id === parseInt(id))
  }
}

const create = ({
  mangaid,
  start_date,
  end_date,
  current_chapter,
  status_reading
}) => {
  let bestaandeManga;
  if (mangaid) {
    bestaandeManga = MANGA.find(e => e.id === mangaid);
  }
  if (!bestaandeManga) {
    throw new Error(`Manga: ${mangaid} does not exist`)
  }

  const newManga = {
    id: Math.max(...MANGACOLLECTION.map(e => e.id)) + 1,
    mangaid: bestaandeManga,
    start_date: start_date.toISOString(),
    end_date: end_date.toISOString(),
    current_chapter,
    status_reading
  }

  MANGACOLLECTION = [...MANGACOLLECTION, newManga];
  return newManga;
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
const deleteById = (id) => {
  MANGACOLLECTION = MANGACOLLECTION.filter(e => e.id !== parseInt(id));
}

module.exports = {
  getAll,
  getById,
  create,
  update,
  deleteById
}