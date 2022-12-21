// andere imports
const axios = require('axios'); // 👈 1
const config = require('config'); // 👈 1
const supertest = require('supertest');
const {
  execSync
} = require('child_process');
// const {
//   PrismaClient
// } = require('@prisma/client');
const {
  prisma
} = require('../src/prisma/prisma');
const createServer = require('../src/createServer');

const data = {
  mangas: [{
    id: "513d1109-975d-4f7c-9cab-f68a790f5279",
    name: "One Piece",
    chapters: 139,
    isFinished: true,
    author: "Tatsuke",
    release_date: "2013-04-17T00:00:00.000Z",
    description: "Test",
    thumbnail: "abcdef",
    genreId: "1",
    userId: "1"
  }],
  genre: [{
    id: "1",
    name: "drama"
  }],
  user: [{
    id: "1",
    name: config.get('auth.testUser.userId'),
    authid: config.get('auth.testUser.username')
  }]
}


// 👇 2
const fetchAccessToken = async () => {
  const response = await axios.post(config.get('auth.tokenUrl'), {
    grant_type: 'password',
    username: config.get('auth.testUser.username'),
    password: config.get('auth.testUser.password'),
    audience: config.get('auth.audience'),
    scope: 'openid profile email offline_access',
    client_id: config.get('auth.clientId'),
    client_secret: config.get('auth.clientSecret'),
  }, {
    headers: {
      "Accept-Encoding": "gzip,deflate,compress"
    }
  });

  return response.data.access_token;
};

const withServer = (setter) => {
  let server;

  beforeAll(async () => {
    server = await createServer();
    execSync('prisma migrate reset --force --schema=./src/prisma/schema.prisma');
    await prisma.user.create({
      data: {
        id: data.user[0].id,
        authid: data.user[0].authid,
        name: data.user[0].name,
      }
    });
    await prisma.genre.create({
      data: {
        id: data.genre[0].id,
        name: data.genre[0].name
      }
    });
    await prisma.manga.create({
      data: {
        id: data.mangas[0].id,
        name: data.mangas[0].name,
        chapters: data.mangas[0].chapters,
        isFinished: data.mangas[0].isFinished,
        author: data.mangas[0].author,
        release_date: data.mangas[0].release_date,
        description: data.mangas[0].description,
        thumbnail: data.mangas[0].thumbnail,
        genreId: data.genre[0].id,
        userId: data.user[0].id
      }
    });
    const token = await fetchAccessToken(); // 👈 4
    setter({
      prisma: prisma,
      request: supertest(server.getApp().callback()),
      authHeader: `Bearer ${token}`, // 👈 4
    });
  });

  afterAll(async () => {
    // Cleanup resources!
    await server.stop();
  });
};

module.exports = {
  fetchAccessToken, // 👈 3
  withServer,
  data
};