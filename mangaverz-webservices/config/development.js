module.exports = {
  log: {
    level: 'silly',
    disabled: false
  },
  cors: {
    origins: ['http://localhost:3000'],
    maxAge: 3 * 60 * 60,
  },
  // database: {
  //   host: localhost,
  //   port: 3306,
  //   database: 'mangaverz',
  //   client: 'mysql2'
  // }
}