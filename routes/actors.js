const express = require('express');
const router = express.Router();
const actorsController = require('../controllers/actors');

router.post('/', 
  /* #swagger.summary = "Add a new actor"
     #swagger.parameters['body'] = {
         in: 'body',
         description: "Actor information",
         required: true,
         schema: { $ref: "#/definitions/Actor" }
     }
     #swagger.responses[201] = {
         description: "Actor added successfully",
         schema: { $ref: "#/definitions/Actor" }
     }
  */
  actorsController.addActor);

router.get('/', 
  /* #swagger.summary = "Get all actors"
     #swagger.responses[200] = {
         description: "List of actors",
         schema: { type: "array", items: { $ref: "#/definitions/Actor" } }
     }
  */
  actorsController.getAllActors);

router.get('/:id', 
  /* #swagger.summary = "Get a single actor"
     #swagger.parameters['id'] = {
         in: 'path',
         description: "Actor ID",
         required: true,
         type: "string"
     }
     #swagger.responses[200] = {
         description: "Actor details",
         schema: { $ref: "#/definitions/Actor" }
     }
  */
  actorsController.getActorById);

router.put('/:id', 
  /* #swagger.summary = "Update an actor"
     #swagger.parameters['id'] = {
         in: 'path',
         description: "Actor ID",
         required: true,
         type: "string"
     }
     #swagger.parameters['body'] = {
         in: 'body',
         description: "Updated actor information",
         required: true,
         schema: { $ref: "#/definitions/Actor" }
     }
     #swagger.responses[200] = {
         description: "Actor updated successfully",
         schema: { $ref: "#/definitions/Actor" }
     }
  */
  actorsController.updateActor);

router.delete('/:id', 
  /* #swagger.summary = "Delete an actor"
     #swagger.parameters['id'] = {
         in: 'path',
         description: "Actor ID",
         required: true,
         type: "string"
     }
     #swagger.responses[200] = {
         description: "Actor deleted successfully"
     }
  */
  actorsController.deleteActor);

module.exports = router;
