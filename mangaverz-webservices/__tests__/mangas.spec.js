const config = require('config');
const {
  withServer,data
} = require('./helpers');

const {
  execSync
} = require('child_process');

const {
  PrismaClient
} = require('@prisma/client');


const mangaIdToDelete =["513d1109-975d-4f7c-9cab-f68a790f5279"];
const genreToDelete =["1"];
const userToDelete =["1"];
// config.get('auth.testUser.userId')
// config.get('auth.testUser.username')

describe('mangas', () => {
  let request;
  let prisma;
  let authHeader;
  withServer(({
    prisma: p,
    request: r,
    authHeader: a
  }) => {
    prisma = p;
    request = r;
    authHeader = a;
  });
  const url = '/api/mangas';

  describe('GET /api/mangas', () => {
    it('should return 200 and all mangas', async () => {
      const response = await request.get(url).set('Authorization', authHeader);
      expect(response.status).toBe(200);
      expect(response.body.items.length).toBe(2);
    });
    it('should return 200 and return length 1', async () => {
      await prisma.manga.deleteMany({});
      const response = await request.get(url).set('Authorization', authHeader);
      expect(response.status).toBe(200);
      expect(response.body.items.length).toBe(0);
    });
  });

  describe('PUT /api/mangas/:id', () => {
    it('it should 200 and return the updated transaction', async () => {
      await prisma.user.create({
        data: {
          id: "data.user[0].id",
          authid: data.user[0].authid,
          name: data.user[0].name,
          nickname:"pop"
        }
      });
      await prisma.genre.create({
        data: {
          id: "data.genre[0].id",
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
          genreId: "data.genre[0].id",
          userId: "data.user[0].id"
        }
      });
      const response = await request.put(`${url}/513d1109-975d-4f7c-9cab-f68a790f5279`)
        .send({
          name: "Chainsaw Man",
          chapters: 70,
          isFinished: true,
          author: "Tatsuki Fujimoto",
          release_date: "2017-05-16",
          description: "test",
          genreId: "b269cf94-f9f6-40f8-bf5d-f9621e5db576"
        }).set('Authorization', authHeader);

      expect(response.status).toBe(201);
      expect(response.body.id).toBeTruthy();
      expect(response.body.chapters).toBe(70);
      expect(response.body.release_date).toBe("2017-05-16T00:00:00.000Z");
      expect(response.body.author).toBe("Tatsuki Fujimoto");
      expect(response.body).toEqual({
        id: "513d1109-975d-4f7c-9cab-f68a790f5279",
        name: "Chainsaw Man",
        chapters: 70,
        isFinished: true,
        author: "Tatsuki Fujimoto",
        release_date: "2017-05-16T00:00:00.000Z",
        description: "test",
        thumbnail: "abcdef",
        genreId: "b269cf94-f9f6-40f8-bf5d-f9621e5db576",
        userId: "data.user[0].id"
      });
    });
    it('it should 500 and return nothing', async () => {
      await prisma.user.create({
        data: {
          id: "qsdfqfq.user[0].id",
          authid: data.user[0].authid,
          name: data.user[0].name,
          nickname:"poppie"
        }
      });
      await prisma.genre.create({
        data: {
          id: "sdkjmfqsdklmf.genre[0].id",
          name: data.genre[0].name
        }
      });
      await prisma.manga.create({
        data: {
          id: "jslmklmfjf",
          name: data.mangas[0].name,
          chapters: data.mangas[0].chapters,
          isFinished: data.mangas[0].isFinished,
          author: data.mangas[0].author,
          release_date: data.mangas[0].release_date,
          description: data.mangas[0].description,
          thumbnail: data.mangas[0].thumbnail,
          genreId: "data.genre[0].id",
          userId: "data.user[0].id"
        }
      });
      const response = await request.put(`${url}/513d1109-975d-4f7c-9cab-f68a790f5279`)
        .send({
          genreId: "b269cf94-f9f6-40f8-bf5d-f9621e5db576"
        }).set('Authorization', authHeader);

      expect(response.status).toBe(500);
    });
  });

  describe('POST /api/mangas', () => {
    it('should return 201 and the newly created transaction', async () => {
      const response = await request.post(url).send({
        name: "Chainsaw Man",
        chapters: 79,
        isFinished: false,
        author: "Tatsuki Fujimoto",
        release_date: "2017-05-12",
        description: "The series focuses on Monkey D. Luffy, a young man made of rubber, who, inspired by his childhood idol, the powerful pirate Red-Haired Shanks, sets off on a journey from the East Blue Sea to find the mythical treasure, the One Piece, and proclaim himself the King of the Pirates.",
        thumbnail: "lsjlmqkdf",
        genreId: "2503c3bb-7f6d-4eda-bed5-af163b7f5287",

      }).set('Authorization', authHeader);
      expect(response.status).toBe(201);
      expect(response.body.id).toBeTruthy();
      expect(response.body.chapters).toBe(79);
      expect(response.body.release_date).toBe("2017-05-12T00:00:00.000Z");
      expect(response.body.author).toBe("Tatsuki Fujimoto");
    });
    it('should return 400', async () => {
      const response = await request.post(url).send({
        name: "Chainsaw Man",
        chapters: 79,
        description: "The series focuses on Monkey D. Luffy, a young man made of rubber, who, inspired by his childhood idol, the powerful pirate Red-Haired Shanks, sets off on a journey from the East Blue Sea to find the mythical treasure, the One Piece, and proclaim himself the King of the Pirates.",
        thumbnail: "lsjlmqkdf",
        genreId: "2503c3bb-7f6d-4eda-bed5-af163b7f5287",

      }).set('Authorization', authHeader);
      expect(response.status).toBe(400);
    });
  });
  describe('GET /api/mangas/:id', () => {

    it('should return 200 and return the manga by id', async () => {
      const response = await request.get(`/api/mangas/513d1109-975d-4f7c-9cab-f68a790f5279`);
      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        id:data.mangas[0].id,
        name: "Chainsaw Man",
        description: "test",
        author: "Tatsuki Fujimoto",
        release_date:"2017-05-16T00:00:00.000Z",
        chapters: 70,
        isFinished: data.mangas[0].isFinished,
        thumbnail: data.mangas[0].thumbnail,
        genre: {
          id: "b269cf94-f9f6-40f8-bf5d-f9621e5db576",
          name: "shonen"
        }
      });
    });
    it('should return 404', async () => {
      const response = await request.get(`/api/mangas/513d1109-975d-4`);
      expect(response.status).toBe(404);
    });
  });

  describe('DELETE /api/mangas/:id', () => {
    it('it should 204 and return nothing', async () => {
      const response = await request.delete(`${url}/513d1109-975d-4f7c-9cab-f68a790f5279`);
      expect(response.status).toBe(204);
      expect(response.body).toEqual({});
    });
    it('it should 500 and return error', async () => {
      const response = await request.delete(`${url}/513d1`);
      expect(response.status).toBe(500);
    });
  });

});