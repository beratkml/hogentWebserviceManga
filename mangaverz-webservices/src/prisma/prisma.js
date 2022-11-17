const {
  PrismaClient
} = require('@prisma/client');
const {
  query
} = require('winston');
const prisma = new PrismaClient({
  log: ["query"]
});
module.exports = {
  prisma
}