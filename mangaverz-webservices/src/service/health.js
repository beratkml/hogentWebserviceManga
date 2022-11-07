const packageJSON = require('../../package.json');
const ping = () => ({
  pong: true
})

//connecties, naam, versie,etc
const getVersion = () => ({
  version: packageJSON.version,
  name: packageJSON.name,
  env: process.env.NODE_ENV
})

module.exports = {
  ping,
  getVersion
}