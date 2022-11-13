module.exports = {
  log: {
    level: 'info',
    disabled: false
  },
  cors: {
    origins: ['http://localhost:3000'],
    maxAge: 3 * 60 * 60,
  },
  database: {
    host: '127.0.0.1',
    port: 3306,
    database: 'mangaverz',
    client: 'mysql2'
  }
}