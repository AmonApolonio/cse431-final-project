const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: "Final Project",
    description: "Movies API",
  },
  host: "cse431-final-project.onrender.com",
  schemes: ['https'],
  definitions: {
    Movie: {
      title: "Inception",
      director: "Christopher Nolan",
      releaseYear: 2010,
      genres: ["action", "sci-fi"],
      rating: 8.8,
      actors: ["actorId1", "actorId2"],
      createdAt: "2023-01-01T00:00:00.000Z",
      updatedAt: "2023-01-01T00:00:00.000Z"
    },
    User: {
      username: "johndoe",
      email: "johndoe@example.com",
      favorites: ["movieId1", "movieId2"],
      birthday: "1990-01-01",
      isActive: true,
      createdAt: "2023-01-01T00:00:00.000Z",
      updatedAt: "2023-01-01T00:00:00.000Z"
    },
    Actor: {
      name: "Leonardo DiCaprio",
      birthdate: "1974-11-11",
      nationality: "American",
      movies: ["movieId1", "movieId2"],
      createdAt: "2023-01-01T00:00:00.000Z",
      updatedAt: "2023-01-01T00:00:00.000Z"
    },
    Genre: {
      name: "Action",
      description: "High energy and lots of physical activities.",
      createdAt: "2023-01-01T00:00:00.000Z",
      updatedAt: "2023-01-01T00:00:00.000Z"
    },
    Review: {
      movieId: "1",
      userId: "1",
      rating: 4.5,
      comment: "Amazing movie with great visuals!",
      createdAt: "2023-01-01T00:00:00.000Z",
      updatedAt: "2023-01-01T00:00:00.000Z"
    }
  }
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);