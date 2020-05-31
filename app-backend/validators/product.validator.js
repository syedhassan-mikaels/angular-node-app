const { body, validationResult } = require('express-validator');

const productValidationRules = () => {
  return [
    body('name', 'Product name is required').notEmpty(),
    body('price', 'Price is required & must be numeric').isNumeric(),
  ];
};

const productValidate = (req, res, next) => {
  const errors = validationResult(req);
  const extractedErrors = [];
  const errorList = errors.array();
  let firstErrorMsg = '';

  if (errors.isEmpty()) {
    return next();
  }

  if (errorList.length > 0) {
    firstErrorMsg = errorList[0].msg;
  }

  errorList.forEach((err) => extractedErrors.push({ [err.param]: err.msg }));

  return res.status(422).json({
    errors: extractedErrors,
    status: false,
    message: firstErrorMsg,
  });
};

module.exports = {
  productValidationRules,
  productValidate,
};
