const { body, param, validationResult } = require('express-validator');

// const validateObjectId = () => {
//   return param('id').isMongoId().withMessage('Must provide a valid MongoDB ObjectId');
// };

const checkValidationResult = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

const movieValidationRules = () => {
  return [
    body('title')
      .notEmpty().withMessage('Title is required')
      .isString().withMessage('Title must be a string')
      .isLength({ min: 1, max: 100 }).withMessage('Title must be between 1 and 100 characters'),

    body('director')
      .notEmpty().withMessage('Director is required')
      .isString().withMessage('Director must be a string')
      .isLength({ min: 1, max: 50 }).withMessage('Director must be between 1 and 50 characters'),

    body('releaseYear')
      .notEmpty().withMessage('Release year is required')
      .isInt({ min: 1800, max: new Date().getFullYear() }).withMessage('Release year must be a valid year'),

    body('genres')
      .optional()
      .isArray().withMessage('Genres must be an array of genre IDs'),

    body('rating')
      .optional()
      .isFloat({ min: 0, max: 10 }).withMessage('Rating must be a number between 0 and 10'),

    body('actors')
      .optional()
      .isArray().withMessage('Actors must be an array of actor IDs'),

    checkValidationResult
  ];
};

const validateId = () => {
  return [
    validateObjectId(),
    checkValidationResult
  ];
};

module.exports = {
  movieValidationRules,
  validateId
};
