module.exports = {
  log: {
    level: 'silly',
    disabled: false
  },
  cors: {
    origins: ['http://localhost:3000'],
    maxAge: 3 * 60 * 60,
  },
  database: {
    host: '127.0.0.1',
    port: 3306,
    database: 'mangaverz_test',
    client: 'mysql2'
  }
}