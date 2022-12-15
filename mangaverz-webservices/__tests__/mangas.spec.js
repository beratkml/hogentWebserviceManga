const config = require('config');
const {
  withServer
} = require('./helpers');
const {
  execSync
} = require('child_process');
const {
  PrismaClient
} = require('@prisma/client');
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
    authid: config.get('auth.testUser.userId')
  }]
}

describe('mangas', () => {
  let request;
  let prisma;
  let authHeader;
  beforeAll(async () => {
    prisma = new PrismaClient({
      log: ["query"]
    })
  });

  withServer(({
    request: r,
    authHeader: a
  }) => {
    request = r;
    authHeader = a;
  });
  const url = '/api/mangas';

  describe('GET /api/mangas', () => {
    beforeAll(async () => {
      await prisma.user.create({
        data: {
          id: data.user[0].id,
          authid: "mapangpang"
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
          genreId: data.genre[0].id,
          userId: data.user[0].id
        }
      });
    });
    afterAll(async () => {
      execSync('prisma migrate reset --force --schema=./src/prisma/schema.prisma');
    });
    it('should return 200 and all mangas', async () => {
      const response = await request.get(url).set('Authorization', authHeader);
      expect(response.status).toBe(200);
      expect(response.body.items.length).toBe(2);
    })
  });

  describe('GET /api/mangas/:id', () => {
    beforeAll(async () => {
      await prisma.user.create({
        data: {
          id: data.user[0].id,
          authid: "mapangpang"
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
          id: "513d1109-975d-4f7c-9cab-f68a790f5279",
          name: data.mangas[0].name,
          chapters: data.mangas[0].chapters,
          isFinished: data.mangas[0].isFinished,
          author: data.mangas[0].author,
          release_date: data.mangas[0].release_date,
          description: data.mangas[0].description,
          genreId: data.genre[0].id,
          userId: data.user[0].id
        }
      });
    });

    it('should return 200 and return the manga by id', async () => {
      const mangaById = data.mangas[0].id;
      const response = await request.get(`/api/mangas/${mangaById}`);
      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        name: data.mangas[0].name,
        description: data.mangas[0].description,
        author: data.mangas[0].author,
        chapters: data.mangas[0].chapters,
        isFinished: data.mangas[0].isFinished,
        genre: {
          id: data.genre[0].id,
          name: data.genre[0].name
        }
      });
    });

    afterAll(async () => {
      execSync('prisma migrate reset --force --schema=./src/prisma/schema.prisma');
    });
  });

  describe('DELETE /api/mangas/:id', () => {

    beforeAll(async () => {
      await prisma.user.create({
        data: {
          id: data.user[0].id,
          authid: "mapangpang"
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
          id: "513d1109-975d-4f7c-9cab-f68a790f5279",
          name: data.mangas[0].name,
          chapters: data.mangas[0].chapters,
          isFinished: data.mangas[0].isFinished,
          author: data.mangas[0].author,
          release_date: data.mangas[0].release_date,
          description: data.mangas[0].description,
          genreId: data.genre[0].id,
          userId: data.user[0].id
        }
      });
    });

    afterAll(async () => {
      execSync('prisma migrate reset --force --schema=./src/prisma/schema.prisma');
    });

    test('it should 204 and return nothing', async () => {
      const response = await request.delete(`${url}/513d1109-975d-4f7c-9cab-f68a790f5279`);
      expect(response.status).toBe(204);
      expect(response.body).toEqual({});
    });
  });

  describe('PUT /api/mangas/:id', () => {

    beforeAll(async () => {
      await prisma.user.create({
        data: {
          id: data.user[0].id,
          authid: "mapangpang"
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
          id: "513d1109-975d-4f7c-9cab-f68a790f5279",
          name: data.mangas[0].name,
          chapters: data.mangas[0].chapters,
          isFinished: data.mangas[0].isFinished,
          author: data.mangas[0].author,
          release_date: data.mangas[0].release_date,
          description: data.mangas[0].description,
          genreId: data.genre[0].id,
          userId: data.user[0].id
        }
      });
    });

    afterAll(async () => {
      execSync('prisma migrate reset --force --schema=./src/prisma/schema.prisma');
    });

    test('it should 200 and return the updated transaction', async () => {
      const response = await request.put(`${url}/513d1109-975d-4f7c-9cab-f68a790f5279`)
        .send({
          name: "Chainsaw Man",
          chapters: 79,
          isFinished: false,
          author: "Tatsuki Fujimoto",
          release_date: "2017-05-12",
          description: "test",
          genreId: "06e59cc3-c249-4c0c-a628-261496fc2c10"
        });

      expect(response.status).toBe(200);
      expect(response.body.id).toBeTruthy();
      expect(response.body.chapters).toBe(79);
      expect(response.body.release_date).toBe("2017-05-12T00:00:00.000Z");
      expect(response.body.author).toBe("Tatsuki Fujimoto");
      expect(response.body).toEqual({
        id: "513d1109-975d-4f7c-9cab-f68a790f5279",
        name: "Chainsaw Man",
        chapters: 79,
        isFinished: false,
        author: "Tatsuki Fujimoto",
        release_date: "2017-05-12T00:00:00.000Z",
        description: "test",
        genreId: "06e59cc3-c249-4c0c-a628-261496fc2c10",
        userId: "1"
      });
    });
  });

  describe('POST /api/mangas', () => {
    beforeAll(async () => {
      await prisma.user.create({
        data: {
          authid: data.user[0].authid
        }
      });
      await prisma.genre.create({
        data: {
          name: data.genre[0].name
        }
      });
    });
    afterAll(async () => {
      execSync('prisma migrate reset --force --schema=./src/prisma/schema.prisma');
    });
    it('should return 201 and the newly created transaction', async () => {
      const response = await request.post(url).send({
        name: "Chainsaw Man",
        chapters: 79,
        isFinished: false,
        author: "Tatsuki Fujimoto",
        release_date: "2017-05-12",
        description: "test",
        genreId: "06e59cc3-c249-4c0c-a628-261496fc2c10",
        userId: "f8f15f1a-1cea-4a2e-a853-7eeb7de1fc88"
      }).set('Authorization', authHeader);;
      expect(response.status).toBe(201);
    });
  });
});