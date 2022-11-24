const userRouter = require('express').Router();
const { validationBody, authService } = require('../middlewares');
const { userJoiSchemas } = require('../schemas');
const { userController } = require('../controller');
const { tryCatchWrapper } = require('../utils');

userRouter.post('/signup', validationBody(userJoiSchemas.addSchema), tryCatchWrapper(userController.registerUser));
userRouter.post('/login', validationBody(userJoiSchemas.loginSchema), tryCatchWrapper(userController.loginUser));

userRouter.use(tryCatchWrapper(authService));

userRouter.patch('/', validationBody(userJoiSchemas.subscriptionSchema), tryCatchWrapper(userController.updateSubscription));
userRouter.post('/logout', tryCatchWrapper(userController.logoutUser));
userRouter.get('/current', tryCatchWrapper(userController.currentUser));

module.exports = userRouter;
