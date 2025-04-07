const express = require('express');
const router = express.Router();
const reviewsController = require('../controllers/reviews');
const { reviewValidationRules, validateReviewId } = require('../middleware/reviewsValidation');
const { isAuthenticated } = require('../middleware/authenticate');

router.post('/', 
  isAuthenticated,
  reviewValidationRules(),
  /* #swagger.summary = "Add a new review"
     #swagger.parameters['body'] = {
         in: 'body',
         description: "Review information",
         required: true,
         schema: { $ref: "#/definitions/Review" }
     }
     #swagger.responses[201] = {
         description: "Review added successfully",
         schema: { $ref: "#/definitions/Review" }
     }
  */
  reviewsController.addReview);

router.get('/movie/:movieId', 
  /* #swagger.summary = "Get reviews for a movie"
     #swagger.parameters['movieId'] = {
         in: 'path',
         description: "Movie ID",
         required: true,
         type: "string"
     }
     #swagger.responses[200] = {
         description: "List of reviews for the movie",
         schema: { type: "array", items: { $ref: "#/definitions/Review" } }
     }
  */
  reviewsController.getReviewsByMovie);

router.put('/:id', 
  isAuthenticated,
  validateReviewId(),
  reviewValidationRules(),
  /* #swagger.summary = "Update a review"
     #swagger.parameters['id'] = {
         in: 'path',
         description: "Review ID",
         required: true,
         type: "string"
     }
     #swagger.parameters['body'] = {
         in: 'body',
         description: "Updated review information",
         required: true,
         schema: { $ref: "#/definitions/Review" }
     }
     #swagger.responses[200] = {
         description: "Review updated successfully",
         schema: { $ref: "#/definitions/Review" }
     }
  */
  reviewsController.updateReview);

router.delete('/:id', 
  isAuthenticated,
  validateReviewId(),
  /* #swagger.summary = "Delete a review"
     #swagger.parameters['id'] = {
         in: 'path',
         description: "Review ID",
         required: true,
         type: "string"
     }
     #swagger.responses[200] = {
         description: "Review deleted successfully"
     }
  */
  reviewsController.deleteReview);

module.exports = router;
