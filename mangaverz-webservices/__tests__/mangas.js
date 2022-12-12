const createServer = require('../src/createServer');
const supertest = require('supertest');
const {
  PrismaClient
} = require('@prisma/client');
const {
  query
} = require('winston');
const {
  expressJwtSecret
} = require('jwks-rsa');
const data = {
  mangas: [{
    id: "513d1109-975d-4f7c-9cab-f68a790f5279",
    name: "One Piece",
    chapters: 139,
    isFinished: true,
    author: "Tatsuke",
    release_date: new Date("2013-04-17"),
    description: "Test",
    genreId: "1",
    userId: "1"
  }],
  genre: [{
    id: "1",
    name: "drama"
  }],
  user: [{
    id: "1",
    authid: "mapangpang"
  }]
}

const dataToDelete = {
  mangas: ["513d1109-975d-4f7c-9cab-f68a790f5279"],
  genre: ["1"],
  user: ["1"]
}

describe('mangas', () => {
  let server;
  let request;
  let prisma;
  beforeAll(async () => {
    server = await createServer();
    request = supertest(server.getApp().callback());
    prisma = new PrismaClient({
      log: ["query"]
    });
  });

  afterAll(async () => {
    await server.stop();
  })
  const url = '/api/mangas';

  describe('GET /api/mangas', () => {
    beforeAll(async () => {
      await prisma.user.create({
        data: {
          id: data.user[0].id,
          authid: data.user[0].authid
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
          genreId: data.mangas[0].genreId,
          userId: data.mangas[0].userId
        }
      });
    });
    afterAll(async () => {
      await prisma.manga.delete({
        where: {
          id: "513d1109-975d-4f7c-9cab-f68a790f5279"
        }
      });
      await prisma.genre.delete({
        where: {
          id: "1"
        }
      });
      await prisma.user.delete({
        where: {
          id: "1"
        }
      });
    });
    it('should return 200 and all mangas', async () => {
      const response = await request.get(url);
      expect(response.status).toBe(200);
      expect(response.body.items.length).toBe(2);
    })
  });

  describe('POST /api/mangas', () => {
    let usersToDelete = [];
    let mangasToDelete = [];
    beforeAll(async () => {
      await prisma.user.create({
        data: {
          id: data.user[0].id,
          authid: data.user[0].authid
        }
      });
      await prisma.genre.create({
        data: {
          id: data.genre[0].id,
          name: data.genre[0].name
        }
      });
    });
    afterAll(async () => {
      await prisma.manga.delete({
        where: {
          id: {
            in: mangasToDelete.map(e => e.id)
          }
        }
      });
      await prisma.genre.delete({
        where: {
          id: "1"
        }
      });
      await prisma.manga.delete({
        where: {
          userId: {
            in: usersToDelete.map(e => e.id)
          }
        }
      });
    });
    it('should return 201 and the newly created transaction', async () => {
      const response = await request.post(url).send({
        name: "Chainsaw Man",
        chapters: 79,
        isFinished: false,
        author: "Tatsuki Fujimoto",
        release_date: "2017-05-12",
        description: "test",
        genreId: data.mangas[0].genreId,
        userId: data.mangas[0].userId
      });
      expect(response.status).toBe(201);
      mangasToDelete.push(response.body.id);
      usersToDelete.push(response.body.user.id);
    });
  });
});