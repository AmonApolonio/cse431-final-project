const { body, param } = require('express-validator');

const reviewValidationRules = () => [
    body('movieId').notEmpty().withMessage('Movie ID is required').isMongoId().withMessage('Invalid Movie ID'),
    body('userId').notEmpty().withMessage('User ID is required').isMongoId().withMessage('Invalid User ID'),
    body('rating').notEmpty().withMessage('Rating is required').isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),
    body('comment').optional().isString().withMessage('Comment must be a string')
];

const validateReviewId = () => [
    param('id').notEmpty().withMessage('Review ID is required').isMongoId().withMessage('Invalid Review ID')
];

module.exports = {
    reviewValidationRules,
    validateReviewId
};
