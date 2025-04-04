const express = require('express');
const router = express.Router();
const genresController = require('../controllers/genres');

router.post('/', 
  /* #swagger.summary = "Add a new genre"
     #swagger.parameters['body'] = {
         in: 'body',
         description: "Genre information",
         required: true,
         schema: { $ref: "#/definitions/Genre" }
     }
     #swagger.responses[201] = {
         description: "Genre added successfully",
         schema: { $ref: "#/definitions/Genre" }
     }
  */
  genresController.addGenre);

router.get('/', 
  /* #swagger.summary = "Get all genres"
     #swagger.responses[200] = {
         description: "List of genres",
         schema: { type: "array", items: { $ref: "#/definitions/Genre" } }
     }
  */
  genresController.getAllGenres);

router.get('/:id', 
  /* #swagger.summary = "Get a single genre"
     #swagger.parameters['id'] = {
         in: 'path',
         description: "Genre ID",
         required: true,
         type: "string"
     }
     #swagger.responses[200] = {
         description: "Genre details",
         schema: { $ref: "#/definitions/Genre" }
     }
  */
  genresController.getGenreById);

router.put('/:id', 
  /* #swagger.summary = "Update a genre"
     #swagger.parameters['id'] = {
         in: 'path',
         description: "Genre ID",
         required: true,
         type: "string"
     }
     #swagger.parameters['body'] = {
         in: 'body',
         description: "Updated genre information",
         required: true,
         schema: { $ref: "#/definitions/Genre" }
     }
     #swagger.responses[200] = {
         description: "Genre updated successfully",
         schema: { $ref: "#/definitions/Genre" }
     }
  */
  genresController.updateGenre);

router.delete('/:id', 
  /* #swagger.summary = "Delete a genre"
     #swagger.parameters['id'] = {
         in: 'path',
         description: "Genre ID",
         required: true,
         type: "string"
     }
     #swagger.responses[200] = {
         description: "Genre deleted successfully"
     }
  */
  genresController.deleteGenre);

module.exports = router;
