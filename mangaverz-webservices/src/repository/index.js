const {
  execSync
} = require('child_process');
const config = require('config');
const {
  getLogger
} = require('../core/logging');

const NODE_ENV = config.get('env')

function initDatabase() {
  execSync('prisma migrate reset --force --schema=./src/prisma/schema.prisma');
}

module.exports = {
  initDatabase
}