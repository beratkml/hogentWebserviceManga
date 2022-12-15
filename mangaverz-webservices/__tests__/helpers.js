// andere imports
const axios = require('axios'); // 👈 1
const config = require('config'); // 👈 1
const supertest = require('supertest');
const {
  PrismaClient
} = require('@prisma/client');
const createServer = require('../src/createServer');


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
    } // 👈 5
  });

  return response.data.access_token;
};

const withServer = (setter) => {
  let server;

  beforeAll(async () => {
    server = await createServer();
    const token = await fetchAccessToken(); // 👈 4

    setter({
      prisma: new PrismaClient({
        log: ["query"]
      }),
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
};