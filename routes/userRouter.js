const userRouter = require('express').Router();
const { validationBody, authService, avatarUploadMiddleware } = require('../middlewares');
const { userJoiSchemas } = require('../schemas');
const { userController, fileController } = require('../controller');
const { tryCatchWrapper } = require('../utils');

userRouter.post('/signup', validationBody(userJoiSchemas.addSchema), tryCatchWrapper(userController.registerUser));
userRouter.post('/login', validationBody(userJoiSchemas.loginSchema), tryCatchWrapper(userController.loginUser));

userRouter.use(tryCatchWrapper(authService));

userRouter.patch('/', validationBody(userJoiSchemas.subscriptionSchema), tryCatchWrapper(userController.updateSubscription));
userRouter.post('/logout', tryCatchWrapper(userController.logoutUser));
userRouter.get('/current', tryCatchWrapper(userController.currentUser));
userRouter.post('/avatars', [tryCatchWrapper(authService), tryCatchWrapper(avatarUploadMiddleware.single('avatar'))], tryCatchWrapper(fileController.uploadAvatar));

module.exports = userRouter;
