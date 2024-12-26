const express = require('express');
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const {
  registrationValidationMW,
  updateUserMW,
} = require('../middlewares/usersMW');
const UserController = require('../controllers/userController');

const imageFolderPath = path.resolve(__dirname, '..', 'public', 'images');

const isImageFolderExists = fs.existsSync(imageFolderPath);

if (!isImageFolderExists) {
  fs.mkdirSync(imageFolderPath, { recursive: true });
}

const storage = multer.diskStorage({
  // куди будемо зберігати файли
  destination: function (req, file, cb) {
    cb(null, imageFolderPath);
  },
  // керує назвою файлу який буде збережено
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

const userRouter = express.Router();

userRouter.get('/', UserController.getUsers);
userRouter.get('/:userId', UserController.getUser);
userRouter.delete('/:userId', UserController.deleteUser);
userRouter.put('/:userId', updateUserMW, UserController.updateUser);
userRouter.post(
  '/',
  upload.single('userPic'),
  registrationValidationMW,
  UserController.createUser
);

module.exports = userRouter;
