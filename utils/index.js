const generateFailureData = data => ({ status: 'error', data });

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

function createNotFoundHttpError() {
  const err = new Error('Not found');
  err.status = 404;
  return err;
}

module.exports = { generateFailureData, tryCatchWrapper, createNotFoundHttpError };
