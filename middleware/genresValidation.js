const { body, param } = require('express-validator');

const genreValidationRules = () => [
    body('name').notEmpty().withMessage('Genre name is required').isString().withMessage('Genre name must be a string'),
    body('description').optional().isString().withMessage('Description must be a string')
];

const validateGenreId = () => [
    param('id').notEmpty().withMessage('Genre ID is required').isMongoId().withMessage('Invalid Genre ID')
];

module.exports = {
    genreValidationRules,
    validateGenreId
};
