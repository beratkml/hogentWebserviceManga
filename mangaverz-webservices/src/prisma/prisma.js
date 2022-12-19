const {
  PrismaClient
} = require('@prisma/client');

const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
});
const {
  query
} = require('winston');
module.exports = {
  prisma
}