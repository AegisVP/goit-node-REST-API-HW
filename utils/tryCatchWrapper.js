const { generateFailureData } = require('./generateReturnObject');

function tryCatchWrapper(callFn) {
  return async (req, res, next) => {
    try {
      await callFn(req, res, next);
    } catch (err) {
      console.log(err.message);
      next(err);
      return res.status(500).json(generateFailureData(err.message));
    }
  };
}

module.exports = { tryCatchWrapper };
