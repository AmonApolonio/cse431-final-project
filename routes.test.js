const request = require('supertest');
const express = require('express');
const routes = require('./routes/index');
const mongodb = require('./data/database');

const app = express();
app.use(express.json());
app.use('/', routes);

jest.mock('./data/database', () => ({
  getDatabase: jest.fn(),
}));

describe('GET Endpoints', () => {
  beforeEach(() => {
    mongodb.getDatabase.mockReturnValue({
      db: () => ({
        collection: jest.fn().mockReturnValue({
          find: jest.fn().mockReturnValue({
            toArray: jest.fn().mockResolvedValue([]),
          }),
          findOne: jest.fn().mockResolvedValue(null),
        }),
      }),
    });
  });

  test('GET /users - should return all users', async () => {
    const response = await request(app).get('/users');
    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
  });

  test('GET /movies - should return all movies', async () => {
    const response = await request(app).get('/movies');
    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
  });

  test('GET /actors - should return all actors', async () => {
    const response = await request(app).get('/actors');
    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
  });

  test('GET /genres - should return all genres', async () => {
    const response = await request(app).get('/genres');
    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
  });

  test('GET /actors/:id - should return a single actor', async () => {
    const actorId = '67f46aa17aa72e21fcd4101b';
    mongodb.getDatabase.mockReturnValue({
      db: () => ({
        collection: jest.fn().mockReturnValue({
          findOne: jest.fn().mockResolvedValue({ _id: actorId, name: 'Actor Name' }),
        }),
      }),
    });
    const response = await request(app).get(`/actors/${actorId}`);
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ _id: actorId, name: 'Actor Name' });
  });

  test('GET /genres/:id - should return a single genre', async () => {
    const genreId = '67f1807f5d27c73af6b4f770';
    mongodb.getDatabase.mockReturnValue({
      db: () => ({
        collection: jest.fn().mockReturnValue({
          findOne: jest.fn().mockResolvedValue({ _id: genreId, name: 'Genre Name' }),
        }),
      }),
    });
    const response = await request(app).get(`/genres/${genreId}`);
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ _id: genreId, name: 'Genre Name' });
  });

  test('GET /movies/:id - should return a single movie', async () => {
    const movieId = '67f469d47aa72e21fcd41016';
    mongodb.getDatabase.mockReturnValue({
      db: () => ({
        collection: jest.fn().mockReturnValue({
          findOne: jest.fn().mockResolvedValue({ _id: movieId, title: 'Movie Title' }),
        }),
      }),
    });
    const response = await request(app).get(`/movies/${movieId}`);
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ _id: movieId, title: 'Movie Title' });
  });

  test('GET /reviews/movie/:movieId - should return reviews for a movie', async () => {
    const movieId = '67f469d47aa72e21fcd41016';
    mongodb.getDatabase.mockReturnValue({
      db: () => ({
        collection: jest.fn().mockReturnValue({
          find: jest.fn().mockReturnValue({
            toArray: jest.fn().mockResolvedValue([{ movieId, comment: 'Great movie!' }]),
          }),
        }),
      }),
    });
    const response = await request(app).get(`/reviews/movie/${movieId}`);
    expect(response.status).toBe(200);
    expect(response.body).toEqual([{ movieId, comment: 'Great movie!' }]);
  });

  test('GET /users/:id - should return a single user', async () => {
    const userId = '67f17fd55d27c73af6b4f767';
    mongodb.getDatabase.mockReturnValue({
      db: () => ({
        collection: jest.fn().mockReturnValue({
          findOne: jest.fn().mockResolvedValue({ _id: userId, username: 'User Name' }),
        }),
      }),
    });
    const response = await request(app).get(`/users/${userId}`);
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ _id: userId, username: 'User Name' });
  });

  test('GET /movies/search - should return movies matching the title "Inception"', async () => {
    const searchQuery = 'Inception';
    mongodb.getDatabase.mockReturnValue({
      db: () => ({
        collection: jest.fn().mockReturnValue({
          find: jest.fn().mockReturnValue({
            toArray: jest.fn().mockResolvedValue([{ title: 'Inception', genre: 'Sci-Fi' }]),
          }),
        }),
      }),
    });
    const response = await request(app).get(`/movies/search?title=${searchQuery}`);
    expect(response.status).toBe(200);
    expect(response.body).toEqual([{ title: 'Inception', genre: 'Sci-Fi' }]);
  });

  test('GET /movies/filter - should return movies matching the genre "action"', async () => {
    const filterQuery = 'action';
    mongodb.getDatabase.mockReturnValue({
      db: () => ({
        collection: jest.fn().mockReturnValue({
          find: jest.fn().mockReturnValue({
            toArray: jest.fn().mockResolvedValue([{ title: 'Mad Max: Fury Road', genre: 'Action' }]),
          }),
        }),
      }),
    });
    const response = await request(app).get(`/movies/filter?genre=${filterQuery}`);
    expect(response.status).toBe(200);
    expect(response.body).toEqual([{ title: 'Mad Max: Fury Road', genre: 'Action' }]);
  });
});
