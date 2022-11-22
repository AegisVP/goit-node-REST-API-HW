const authRouter = require('express').Router();
const { authController } = require('../controller');
const { tryCatchWrapper } = require('../utils');

authRouter.post('/register', tryCatchWrapper(authController.registerUser));
authRouter.post('/login', tryCatchWrapper(authController.loginUser));

module.exports = authRouter;
