//requirements en imports
const knex = require('knex');
const config = require('config');
const {
  getLogger
} = require('../core/logging');

//object instanties, aanroep methodes, variabelen
const DATABASE_CLIENT = config('database.client');
const DATABASE_HOST = config('database.host');
const DATABASE_PORT = config('database.port');
const DATABASE_USERNAME = config('database.username');
const DATABASE_PASSWORD = config('database.password');
const DATABASE_DATABASE = config('database.database');
const NODE_ENV = config('env');
const isDevelopment = NODE_ENV == "development";
let knexInstance;

//else
const initializeDatabase = async () => {
  const knexOptions = {
    client: DATABASE_CLIENT,
    debug: isDevelopment,
    connection: {
      host: DATABASE_HOST,
      port: DATABASE_PORT,
      user: DATABASE_USERNAME,
      password: DATABASE_PASSWORD,
      database: DATABASE_DATABASE
    }
  }
  knexInstance = knex(knexOptions);
  //database check
  try {
    await knexInstance('SELECT 1+1 AS result');
  } catch (error) {
    getLogger().error('Error init database', {
      error
    });
    throw new Error('init database failed');
  }
}

const getKnex = () => {
  if (!knexInstance) {
    throw new Error('Connection not initialized');
  }
  return knexInstance
}

//Object kan niet worden aangepast
const tables = Object.freeze({
  //tabel binnen databank databank
})

module.exports = {
  initializeDatabase,
  getKnex,
  tables
};