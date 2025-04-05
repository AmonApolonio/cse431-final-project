const express = require('express');
const router = express.Router();

const moviesController = require('../controllers/movies');
const { movieValidationRules, validateId } = require('../middleware/movieValidation');
const { isAuthenticated } = require('../middleware/authenticate.js');

router.get('/', 
  /* #swagger.summary = "Get all movies"
     #swagger.responses[200] = {
         description: "List of movies",
         schema: { type: "array", items: { $ref: "#/definitions/Movie" } }
     }
  */
  moviesController.getAll);

router.get('/:id', 
  validateId(), 
  /* #swagger.summary = "Get a single movie"
     #swagger.parameters['id'] = {
         in: 'path',
         description: "Movie ID",
         required: true,
         type: "string"
     }
     #swagger.responses[200] = {
         description: "Movie details",
         schema: { $ref: "#/definitions/Movie" }
     }
  */
  moviesController.getSingle);

router.post('/', 
  movieValidationRules(), 
  // isAuthenticated,
  /* #swagger.summary = "Create a new movie"
     #swagger.parameters['body'] = {
         in: 'body',
         description: "Movie information",
         required: true,
         schema: { $ref: "#/definitions/Movie" }
     }
     #swagger.responses[201] = {
         description: "Movie created successfully",
         schema: { $ref: "#/definitions/Movie" }
     }
  */
  moviesController.createMovie);

router.put('/:id', 
  validateId(), 
  movieValidationRules(), 
  // isAuthenticated,
  /* #swagger.summary = "Update a movie"
     #swagger.parameters['id'] = {
         in: 'path',
         description: "Movie ID",
         required: true,
         type: "string"
     }
     #swagger.parameters['body'] = {
         in: 'body',
         description: "Updated movie information",
         required: true,
         schema: { $ref: "#/definitions/Movie" }
     }
     #swagger.responses[200] = {
         description: "Movie updated successfully",
         schema: { $ref: "#/definitions/Movie" }
     }
  */
  moviesController.updateMovie);

router.delete('/:id', 
  validateId(),
  // isAuthenticated,
  /* #swagger.summary = "Delete a movie"
     #swagger.parameters['id'] = {
         in: 'path',
         description: "Movie ID",
         required: true,
         type: "string"
     }
     #swagger.responses[200] = {
         description: "Movie deleted successfully"
     }
  */
  moviesController.deleteMovie);

router.get('/search', 
  /* #swagger.summary = "Search movies by title"
     #swagger.parameters['title'] = {
         in: 'query',
         description: "Title to search for",
         required: true,
         type: "string"
     }
     #swagger.responses[200] = {
         description: "List of movies matching the title",
         schema: { type: "array", items: { $ref: "#/definitions/Movie" } }
     }
  */
  moviesController.searchMovies);

router.get('/filter', 
  /* #swagger.summary = "Filter movies by genre"
     #swagger.parameters['genre'] = {
         in: 'query',
         description: "Genre to filter by",
         required: true,
         type: "string"
     }
     #swagger.responses[200] = {
         description: "List of movies matching the genre",
         schema: { type: "array", items: { $ref: "#/definitions/Movie" } }
     }
  */
  moviesController.filterMoviesByGenre);

module.exports = router;
