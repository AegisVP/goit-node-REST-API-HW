const userRouter = require('express').Router();
const { validationBody, authService } = require('../middlewares');
const { userJoiSchemas } = require('../schemas');
const { userController } = require('../controller');
const { tryCatchWrapper } = require('../utils');

userRouter.patch('/', validationBody(userJoiSchemas.subscriptionSchema), tryCatchWrapper(userController.updateSubscription));
userRouter.post('/signup', validationBody(userJoiSchemas.addSchema), tryCatchWrapper(userController.registerUser));
userRouter.post('/login', validationBody(userJoiSchemas.loginSchema), tryCatchWrapper(userController.loginUser));
userRouter.post('/logout', tryCatchWrapper(authService), tryCatchWrapper(userController.logoutUser));
userRouter.get('/current', tryCatchWrapper(authService), tryCatchWrapper(userController.currentUser));

module.exports = userRouter;
