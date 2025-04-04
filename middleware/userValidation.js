const { body, param, validationResult } = require('express-validator');

const validateObjectId = () => {
  return param('id').isMongoId().withMessage('Must provide a valid MongoDB ObjectId');
};

const checkValidationResult = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

const userValidationRules = () => {
  return [
    body('username')
      .notEmpty().withMessage('Username is required')
      .isString().withMessage('Username must be a string')
      .isLength({ min: 3, max: 30 }).withMessage('Username must be between 3 and 30 characters'),

    body('email')
      .notEmpty().withMessage('Email is required')
      .isEmail().withMessage('Must provide a valid email address')
      .normalizeEmail(),

    body('favorites')
      .optional()
      .isArray().withMessage('Favorites must be an array of movie IDs'),

    body('birthday')
      .optional()
      .isISO8601().withMessage('Birthday must be a valid date in ISO8601 format'),

    body('isActive')
      .optional()
      .isBoolean().withMessage('isActive must be a boolean'),

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
  userValidationRules,
  validateId
};