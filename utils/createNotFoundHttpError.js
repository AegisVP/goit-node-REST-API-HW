function createNotFoundHttpError() {
  const err = new Error('Not found');
  err.status = 404;
  return err;
}

module.exports = createNotFoundHttpError;
