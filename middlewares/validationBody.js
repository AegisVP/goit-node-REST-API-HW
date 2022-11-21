const { requestError } = require('../utils');

const validationBody = schema => {
  const func = async (req, _, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) next(requestError(400, error.message));

    next();
  };

  return func;
};

module.exports = { validationBody };
