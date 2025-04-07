const { body, param } = require('express-validator');

const actorValidationRules = () => [
    body('name').notEmpty().withMessage('Actor name is required').isString().withMessage('Actor name must be a string'),
    body('bio').notEmpty().withMessage('Biography is required').isString().withMessage('Biography must be a string'),
    body('birthDate').notEmpty().withMessage('Birth date is required').isISO8601().withMessage('Invalid birth date format'),
    body('movies').optional().isArray().withMessage('Movies must be an array of movie IDs')
        .custom((movies) => movies.every(id => typeof id === 'string')).withMessage('Each movie ID must be a string')
];

const validateActorId = () => [
    param('id').notEmpty().withMessage('Actor ID is required').isMongoId().withMessage('Invalid Actor ID')
];

module.exports = {
    actorValidationRules,
    validateActorId
};
