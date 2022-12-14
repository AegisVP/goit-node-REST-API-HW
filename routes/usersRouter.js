const userRouter = require('express').Router();
const { validationBody, authService, avatarUploadMiddleware } = require('../middlewares');
const { userJoiSchemas } = require('../schemas');
const { userController } = require('../controller');
const { tryCatchWrapper } = require('../utils');

userRouter.post('/signup', validationBody(userJoiSchemas.addSchema), tryCatchWrapper(userController.registerUser));
userRouter.post('/login', validationBody(userJoiSchemas.loginSchema), tryCatchWrapper(userController.loginUser));
userRouter.post('/verify', validationBody(userJoiSchemas.verifyEmailSchema), tryCatchWrapper(userController.resendVerificationEmail));
userRouter.get('/verify/:verificationToken', tryCatchWrapper(userController.verifyUserEmail));

userRouter.use(tryCatchWrapper(authService));

userRouter.patch('/', validationBody(userJoiSchemas.subscriptionSchema), tryCatchWrapper(userController.updateSubscription));
userRouter.post('/logout', tryCatchWrapper(userController.logoutUser));
userRouter.get('/current', tryCatchWrapper(userController.currentUser));
userRouter.patch('/avatars', tryCatchWrapper(avatarUploadMiddleware.single('avatar')), tryCatchWrapper(userController.uploadAvatar));

module.exports = userRouter;
