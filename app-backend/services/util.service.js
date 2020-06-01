module.exports.responseError = function (res, err, code) {
  if (typeof err == 'object' && typeof err.message != 'undefined') {
    err = err.message;
  }
  if (typeof code !== 'undefined') res.statusCode = code;
  return res.json({ status: false, message: err });
};

module.exports.validateError = function (res, errors = [], message = '') {
  res.statusCode = 422;
  return res.json({ status: false, errors, message });
};

module.exports.responseSuccess = function (res, data, message = '', code) {
  if (typeof code !== 'undefined') res.statusCode = code;
  return res.json({ data, status: true, message });
};

module.exports.throwError = throwError = function (err_message, log) {
  if (log === true) {
    console.error(err_message);
  }
  throw new Error(err_message);
};
