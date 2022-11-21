const generateFailureData = require('./generateFailureData');

function tryCatchWrapper(callFn) {
  return async (req, res, next) => {
    try {
      await callFn(req, res, next);
    } catch (err) {
      console.log(err.message);
      next(err);
    }
  };
}

module.exports = tryCatchWrapper;
