module.exports = {
  log: {
    level: 'info',
    disabled: false
  },
  cors: {
    origins: ['https://frontendweb-mangaverz.onrender.com'],
    maxAge: 3 * 60 * 60,
  },
  database: {
    host: 'vichogent.be ',
    port: 40043,
    database: '181265bk ',
    client: 'mysql2'
  }
}
// https://frontendweb-mangaverz.onrender.com