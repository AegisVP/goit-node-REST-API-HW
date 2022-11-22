const authRouter = require('express').Router();
const { validationBody, authService, authMid } = require('../middlewares');
const { userJoiSchemas } = require('../schemas');
const { authController } = require('../controller');
const { tryCatchWrapper } = require('../utils');

authRouter.post('/signup', validationBody(userJoiSchemas.addSchema), tryCatchWrapper(authController.registerUser));
authRouter.post('/login', validationBody(userJoiSchemas.loginSchema), tryCatchWrapper(authController.loginUser));
authRouter.post('/logout', tryCatchWrapper(authService), tryCatchWrapper(authController.logoutUser));
authRouter.get('/current', tryCatchWrapper(authService), tryCatchWrapper(authController.currentUser));

module.exports = authRouter;
