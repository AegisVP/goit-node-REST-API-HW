const express = require('express');
const avatarRouter = express.Router();
const multer = require('multer');
const path = require('path');

const { fileController } = require('../controller');
const { authService } = require('../middlewares');
const { tryCatchWrapper } = require('../utils');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.resolve('./public/avatars'));
  },
  filename: (req, file, cb) => {
    const fileExt = String(file.originalname.split('.').pop()).toLocaleLowerCase();
    const savedFileName = `${req.user.id}.${fileExt}`;
    cb(null, savedFileName);
    
    req.avatarFileName = savedFileName;
  },
});

const uploadMiddleware = multer({ storage });

avatarRouter.get('/', express.static('./public/avatars'));
avatarRouter.post('/upload', [tryCatchWrapper(authService), uploadMiddleware.single('avatar')], tryCatchWrapper(fileController.uploadAvatar));

module.exports = avatarRouter;
