const knex = require('knex')
const config = require('config');
const {
  getLogger
} = require('../core/logging');

const DATABASE_CLIENT = config.get('database.client');
const DATABASE_HOST = config.get('database.host');
const DATABASE_PORT = config.get('database.port');
const DATABASE_USERNAME = config.get('database.username');
const DATABASE_PASSWORD = config.get('database.password');
const DATABASE_DATABASE = config.get('database.database');
const NODE_ENV = config.get('env');
const isDevelopment = NODE_ENV === 'development';
let knexInstance;
const initializeDatabase = async () => {
  const knexOptions = {
    client: DATABASE_CLIENT,
    connection: {
      host: DATABASE_HOST,
      port: DATABASE_PORT,
      user: DATABASE_USERNAME,
      password: DATABASE_PASSWORD,
      database: DATABASE_DATABASE
    }
  }
  knexInstance = knex(knexOptions);
  try {
    await knexInstance.raw('SELECT 1+1 AS result');
  } catch (error) {
    logger.error(error.message, {
      error
    });
    throw new Error('Could not initialize the data layer');
  }
  return knexInstance;
}

function getKnex() {
  const logger = getLogger();
  if (!knexInstance) {
    logger.error(knexInstance);
    throw new Error('Please initialize the data layer before getting the Knex instance')
  };
  return knexInstance;
}

const tables = Object.freeze({
  mangacollection: 'mangacollection',
  manga: 'mangas',
  user: 'user',
});

module.exports = {
  initializeDatabase,
  tables,
  getKnex,
}