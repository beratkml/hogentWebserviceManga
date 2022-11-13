const {
  getKnex,
  tables
} = require('../data/index');

const {
  getLogger
} = require('../core/logging');

const getAll = async () => {
  const collection = await getKnex()(tables.mangacollection)
    .select('*')
    .orderBy(`${tables.mangacollection}.id`, 'desc');
  return collection;
}
const SELECTED = [
  `${tables.mangacollection}.id`, 'startDate', 'endDate', 'current_chapter', 'statusReading',
  'MangaID', `${tables.manga}.name as manga_name`, `${tables.manga}.description as manga_description`,
  `${tables.manga}.author as manga_author`
]
const format = ({
  MangaID,
  manga_name,
  manga_description,
  manga_author,
  ...rest
}) => ({
  ...rest,
  manga: {
    id: MangaID,
    name: manga_name,
    description: manga_description,
    author: manga_author
  }
})

const getCollectionItemById = async (id) => {
  const collection = await getKnex()(tables.mangacollection)
    .join(tables.manga, `MangaID`, '=', `${tables.manga}.id`)
    .first(SELECTED)
    .where(`${tables.mangacollection}.id`, id);
  return collection && format(collection);
}



module.exports = {
  getAll,
  getCollectionItemById
}